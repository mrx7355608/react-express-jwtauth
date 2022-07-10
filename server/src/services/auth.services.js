const { verify } = require("jsonwebtoken");
const userDataController = require("../models/user.data");
const AppError = require("../utils/AppError");
const config = require("../../config/default");

class AuthServices {
    async signup(userData) {
        const newUser = await userDataController.createUser(userData);
        return newUser;
    }
    async login(userData) {
        const { email, password } = userData;

        const user = await userDataController.userExists({ email });
        if (!user) throw new AppError("User does not exists", 404);

        const isValidPassword = await user.comparePassword(
            user.password,
            password
        );
        if (!isValidPassword) throw new AppError("Bad email or password", 400);
        return user;
    }
    async updatePassword(userId, newData) {
        // Checking if user exists
        const isUser = await userDataController.userExists({ _id: userId });
        if (!isUser) throw new AppError("User does not exists!", 404);

        const updatedUser = await userDataController.updatePassword(
            userId,
            newData
        );
        return updatedUser;
    }
    async refreshToken(refreshTokenCookie) {
        if (!refreshTokenCookie)
            throw new AppError("refresh token missing, login again", 400);
        const validToken = verify(
            refreshTokenCookie,
            config.refreshTokenSecret
        );
        if (!validToken)
            throw new AppError("Invalid refresh token, login again", 400);

        const user = await userDataController.userExists({
            _id: validToken.userID,
        });
        if (!user) throw new AppError("User no longer exists", 404);

        return user;
    }
}
module.exports = AuthServices;
