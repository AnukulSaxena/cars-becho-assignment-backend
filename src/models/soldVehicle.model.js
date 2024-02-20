import mongoose, { Schema } from "mongoose";

const soldVehicleSchema = new Schema({

    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    sold_vehicle_info: {
        type: Object,
        required: false,
        properties: {
            purchase_date: {
                type: Date,
                required: true
            },
            price: {
                type: Number,
                required: true,
                min: 0
            }
        }
    }
});

export const SoldVehicle = mongoose.model('SoldVehicle', soldVehicleSchema);

