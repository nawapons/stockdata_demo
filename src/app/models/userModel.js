import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Please provide fullname"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
    }
})
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;