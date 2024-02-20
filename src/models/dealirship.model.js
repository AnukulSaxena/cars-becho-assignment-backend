import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const dealershipSchema = new Schema({
    dealership_email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true
    },
    dealership_name: {
        type: String,
        required: true
    },
    dealership_location: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dealership_info: {
        type: Object,
        default: {},
        properties: {
            phone: String,
            website: String,
            description: String,
            avatar: String
        }
    },
    cars: [{
        type: Schema.Types.ObjectId,
        ref: 'Car'
    }],
    deals: [{
        type: Schema.Types.ObjectId,
        ref: 'Deal'
    }],
    sold_vehicles: [{
        type: Schema.Types.ObjectId,
        ref: 'SoldVehicle'
    }]
});

dealershipSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

dealershipSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

dealershipSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            dealership_email: this.dealership_email,
            dealership_name: this.dealership_name,
            location: this.location
        },
        process.env.DEALER_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.DEALER_ACCESS_TOKEN_EXPIRY
        }
    )
}


export const Dealership = mongoose.model('Dealership', dealershipSchema);

