import mongoose, { Schema } from "mongoose";

const dealSchema = new Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    deal_info: {
        type: Object,
        required: true,
        properties: {
            discount: {
                type: Number,
                min: 0
            },
            payment_terms: {
                type: String,
                enum: ['Cash', 'Loan', 'Lease']
            }
        }
    }
});

export const Deal = mongoose.model('Deal', dealSchema);
