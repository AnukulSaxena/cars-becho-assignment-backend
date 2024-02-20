import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema(
    {
        user_email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
            index: true,
        },
        user_location: String,

        user_info: {
            type: Object,
            default: {},
            required: false,
            properties: {
                firstName: String,
                lastName: String,
                phone: String,
                avatar: String
            }
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        vehicle_info: [{
            type: Schema.Types.ObjectId,
            ref: 'SoldVehicle'
        }]
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            user_email: this.user_email
        },
        process.env.USER_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.USER_ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)