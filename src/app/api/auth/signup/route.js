import { connect } from "@/app/mongodb"
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import User from "@/app/models/userModel";
connect();
export async function POST(req) {
    try {
        const body = await req.json();
        const { fullname, email, password } = body;
        if (!fullname || !email || !password) {
            return NextResponse.json({ status: "error", message: "Please enter all required fields." })
        }
        const checkExists = await User.findOne({ email })
        if (checkExists) {
            return NextResponse.json({ status: "error", message: "User already exists." })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = bcryptjs.hashSync(password, salt)

        const newUser = new User({
            fullname, email, password: hashedPassword
        })
        const savedUser = await newUser.save();
        return NextResponse.json({ status: "success", message: "Create user successfully" })
    } catch (error) {
        return NextResponse.json({ status: "error", message: error.message })
    }

}