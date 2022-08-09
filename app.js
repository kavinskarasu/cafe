const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/user");
const adminRouter=require('./routes/admin');

app.use(express.json());
app.use("/admin",adminRouter);
app.use("/user", userRouter);

module.exports = app;
