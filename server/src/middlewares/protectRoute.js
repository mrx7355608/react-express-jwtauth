const AppError = require("../utils/AppError");
const { verify } = require("jsonwebtoken");
const config = require("../../config/default");
const userDataController = require("../models/user.data");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

module.exports = asyncErrorHandler(async (req, res, next) => {
    // Check if token exists
    let token;
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")
    )
        throw new AppError("login to continue.", 403);

    // Bearer eylsd3zd2ah345asdjre => eylsd3zd2ah345asdjre
    token = req.headers.authorization.split(" ")[1];

    // Verify token
    const validToken = verify(token, config.accessTokenSecret);
    if (!validToken) throw new AppError("invalid token", 401);

    // User is active or not
    const user = await userDataController.getUser(validToken.userID);
    if (!user) throw new AppError("User does not exists", 401);

    // If jwt was issued before the password was changed
    if (user.vers !== validToken.vers)
        throw new AppError(
            "You recently changed your password, login to continue",
            403
        );

    req.user = user;
    next();
});
