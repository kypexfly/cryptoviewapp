const express = require("express");
const axios = require("axios");

app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.listen((port = 4000), () => {
  console.log("App listening to port 4000...");
});

// routes

app.get("/api/assets/:id", (req, res) => {
  const options = {
    method: "GET",
    url: `https://api.coincap.io/v2/assets/${req.params.id}`,
  };

  axios
    .request(options)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      res.status(400).json(error);
    });
});

app.get("/api/assets", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.coincap.io/v2/assets",
  };

  axios
    .request(options)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      res.status(400).json(error);
    });
});

app.get("/api/rates/:asset", (req, res) => {
  const options = {
    method: "GET",
    url: `https://api.coincap.io/v2/rates/${req.params.asset}`,
  };

  console.log(options.url)

  axios
    .request(options)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      res.status(400).json(error);
    });
});


app.get("/api/news", (req, res) => {


  let api_url = "https://cryptopanic.com/api/v1/posts/?auth_token=c696e7b458c6e01b7230f59a5047455f7774adfc&public=true"
  req.query.page && (api_url = api_url.concat("&page=", req.query.page))
  req.query.regions && (api_url = api_url.concat("&regions=", req.query.regions))
  req.query.kind && (api_url = api_url.concat("&kind=", req.query.kind))

  const options = {
    method: "GET",
    url: api_url,
  };

  console.log(options.url)

  axios
    .request(options)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      res.status(400).json(error);
    });
});

