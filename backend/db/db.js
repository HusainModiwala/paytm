import mongoose, { Schema, model } from "mongoose";
mongoose.connect("mongodb+srv://hussainmodiwala:FZCyggsGmULbNiRN@cluster0.xwmscyj.mongodb.net/paytm");

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