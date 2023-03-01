const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000


mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        })

    })
    .catch((err) => console.log(err))