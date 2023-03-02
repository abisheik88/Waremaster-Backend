const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please Enter the Email address"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter valid email"
        ]

    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
        minLength: [6, "Password must contain atleast six characters"],
        // maxLength: [18, "Password should not exceed 18 Characters"]
    },
    photo: {
        type: String,
        required: [true, "Please add photo"],
        default: "https://i.ibb.co/4pDNDK1/avatar.png"
    },
    phone: {
        type: String,
        default: "+91",
    },
    bio: {
        type: String,
        maxLength: [250, "Bio should not exceed 250 Characters"],
        default: "bio",
    },
},
    {
        timestamps: true,
    }
);

//Encrypt password before saving to Db
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword;
    next();
})

const User = mongoose.model("User", userSchema)
module.exports = User