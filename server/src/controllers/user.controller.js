const UserServices = require("../services/user.services");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const userServices = new UserServices();

const sendResponse = (res, data, statusCode) => {
    res.status(statusCode).json({
        ok: true,
        data,
    });
};

exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user._id;
    await userServices.deleteUser(userId);
    return sendResponse(res, null, 204);
});
exports.getUser = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user._id;
    const user = await userServices.getUser(userId);
    return sendResponse(res, user, 200);
});
