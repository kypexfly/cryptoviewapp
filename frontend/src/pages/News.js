import NewsList from '../components/NewsList';
const { useEffect, useState } = require('react')

const News = () => {


    const [news, setNews] = useState([])
    const [langs, setLangs] = useState('')

    const handleLang = async () => {
        const lang_param = [eng.lang, spa.lang, por.lang, fra.lang, rus.lang].filter(Boolean).join(',')
        setLangs(lang_param)
        const lang_url = "/api/news?regions=".concat(lang_param)
        setNews([])
        fetchNewsFeed(lang_url)
    }

    const useHandleParams = (enableState, langState) => {
        const [enable, setEnable] = useState(enableState)
        const [lang, setLang] = useState(langState)
        const afunct = (e) => {
            setEnable(!enable)
            setLang(lang ? '' : e.target.value)
        }

        return {
            enable,
            lang,
            afunct
        }
    }

    const eng = useHandleParams(1, 'en')
    const spa = useHandleParams()
    const por = useHandleParams()
    const fra = useHandleParams()
    const rus = useHandleParams()

    const fetchNewsFeed = async (api_path = '/api/news') => {
        fetch(api_path)
            .then(res => res.json())
            .then(news => setNews(news))
            .catch(err => console.log(err))
    }

    const handleNext = async () => {
        if (news.next == null) return
        const next_url = "/api/news?".concat(news.next.match("&page=.*"), "&regions=", langs)
        setNews([])
        fetchNewsFeed(next_url)
    }

    const handlePrev = async () => {
        if (news.previous == null) return
        const prev_url = "/api/news?".concat(news.previous.match("&page=.*"), "&regions=", langs)
        setNews([])
        fetchNewsFeed(prev_url)
    }

    useEffect(() => {
        fetchNewsFeed()
    }, [])


    return (
        <div>

            <h1>Crypto News</h1> <small>(Powered by <a href="https://cryptopanic.com/">CryptoPanic</a>)</small>
            <hr />

            <div id="news">
                <div className="feed-options boxed">
                    {/* <div>
                        <h4>Type: </h4>
                        <div>
                            <button>news</button>
                            <button>media</button>
                        </div>
                    </div> */}
                    <div>
                        <h4>Language</h4>
                        <div className='justify-between'>
                            <button className={eng.enable ? "active" : undefined} onClick={eng.afunct} value="en">english</button>
                            <button className={spa.enable ? "active" : undefined} onClick={spa.afunct} value="es">español</button>
                            <button className={por.enable ? "active" : undefined} onClick={por.afunct} value="pt">português</button>
                            <button className={fra.enable ? "active" : undefined} onClick={fra.afunct} value="fr">français</button>
                            <button className={rus.enable ? "active" : undefined} onClick={rus.afunct} value="ru">русский</button>
                        </div>

                        <button
                            className='button'
                            onClick={handleLang}>
                            Save
                        </button>

                    </div>
                    <div>
                        <h4>Page</h4>
                        <div>
                            <button onClick={handlePrev} disabled={(news.previous == null) ? 1 : 0} >prev</button>
                            <button onClick={handleNext} disabled={(news.next == null) ? 1 : 0}>next</button>
                        </div>
                    </div>

                </div>

                <div className="feed-list">
                    {!news.results ? (<div className='loading'><span><i className="fas fa-sync fa-spin"></i> Loading...</span></div>) :
                        news.results.map((anew, index) => (
                            <NewsList anew={anew} key={index} />
                        ))}
                </div>

            </div>

        </div>
    );
};

export default News;