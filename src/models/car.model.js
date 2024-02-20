import mongoose, { Schema } from "mongoose";


const carSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['Sedan', 'SUV', 'Hatchback', 'Truck', 'Other']
    },
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    car_info: {
        type: Object,
        required: false,
        default: {},
        properties: {
            mileage: {
                type: Number,
                min: 0
            },
            color: {
                type: String
            },
            features: {
                type: Array,
                of: String
            },
            transmission: {
                type: String,
                enum: ['Automatic', 'Manual']
            },
            engine: {
                type: String
            },
            fuelType: {
                type: String,
                enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric']
            },
            seatingCapacity: {
                type: Number,
                min: 1
            }
        }
    }
});

export const Car = mongoose.model('Car', carSchema);

