require("dotenv").config({ path: "./api_config.env" });

module.exports = {
    host: process.env.API_URL,
    port: process.env.PORT,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    databaseUrl: "mongodb://localhost:27017/react-node-jwtauth",
};
