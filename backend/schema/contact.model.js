import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name should be atleast 3 char"]
    },
    email: {
        type: String,
        unique: false,
        required: true
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    avatar:{
        type:String,
        default:""
    }
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;