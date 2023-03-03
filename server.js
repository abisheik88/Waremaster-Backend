const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const cors = require('cors');
const userRoute = require("./routes/userRoute")
const productRoute = require("./routes/productRoute")
const errorHandler = require("./middleWare/errorMiddleware")
const cookieParser = require("cookie-parser");

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

//Routes Middleware
app.use("/api/users", userRoute)
app.use("/api/products", productRoute);

//Routes
app.get("/", (req, res) => {
    res.send("Home page")
})

//Error Middleware
app.use(errorHandler);
//Connect to DB and start server
const PORT = process.env.PORT || 5000
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        })
    })
    .catch((err) => console.log(err))