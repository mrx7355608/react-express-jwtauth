const { sign } = require("jsonwebtoken");
const config = require("../../config/default");

const createAccessToken = (user) =>
    sign({ userID: user._id, vers: user.vers }, config.accessTokenSecret, {
        expiresIn: "10m",
    });

const createRefreshToken = (user) =>
    sign({ userID: user._id, vers: user.vers }, config.refreshTokenSecret, {
        expiresIn: "7d",
    });

const createAuthTokens = (user) => {
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    return { accessToken, refreshToken };
};
module.exports = createAuthTokens;
