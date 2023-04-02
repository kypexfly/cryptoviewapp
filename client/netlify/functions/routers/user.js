"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
exports.userRouter = router;
// login route
router.post('/login', userController_1.loginUser);
// signup route
router.post('/signup', userController_1.signupUser);
//# sourceMappingURL=user.js.map