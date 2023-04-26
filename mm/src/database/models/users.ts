import mongoose, { model, models } from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    number: String,
    password: String,
    role: {
        type: String,
        default: "user"
    }
}, {
    timestamps: true
})

export const userModel = models.users || model("users", schema)