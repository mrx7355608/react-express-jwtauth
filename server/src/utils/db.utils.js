const config = require("../../config/default");
const mongoose = require("mongoose");

const connectToDB = async () => await mongoose.connect(config.databaseUrl);
module.exports = connectToDB;
