const express = require("express");
const config = require("../config/default");
const connectToDB = require("./utils/db.utils");
const errorHandler = require("./utils/errorHandler");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const app = express();
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST", "PUT"],
    })
);
app.use(cookieParser());
app.use(express.json());

app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/user.routes"));
app.use(errorHandler);

const startApp = async () => {
    const port = config.port;
    await connectToDB();
    console.log("connected to database successfully");
    app.listen(port);
    console.log("express server started");
};
startApp();
