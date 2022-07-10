const createAuthTokens = require("../utils/createAuthTokens");
const AuthServices = require("../services/auth.services");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const sendResponse = (res, data, statusCode) => {
    const { accessToken, refreshToken } = createAuthTokens(data);
    const cookieOptions = {
        httpOnly: true,
        path: "/refresh-token",
    };
    res.cookie("cu", refreshToken, cookieOptions);
    delete data.password;
    delete data.vers;
    res.status(statusCode).json({
        ok: true,
        data,
        accessToken,
    });
};

const authServices = new AuthServices();

exports.signup = asyncErrorHandler(async (req, res) => {
    const userData = req.body;
    const user = await authServices.signup(userData);
    return sendResponse(res, user, 201);
});
exports.login = asyncErrorHandler(async (req, res) => {
    const userData = req.body;
    const user = await authServices.login(userData);
    return sendResponse(res, user, 200);
});
exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user._id;
    const newData = req.body;
    const user = await authServices.updatePassword(userId, newData);
    return sendResponse(res, user, 200);
});
exports.refreshToken = asyncErrorHandler(async (req, res) => {
    const data = await authServices.refreshToken(req.cookies.cu);
    return sendResponse(res, data, 200);
});
