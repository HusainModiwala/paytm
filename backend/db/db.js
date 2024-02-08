import mongoose, { Schema, model } from "mongoose";
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requried: true
    },
    balance: {
        type: Number,
        required: true
    }
})

export const User = model("User", userSchema);
export const Account = model("Account", accountSchema);
