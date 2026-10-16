import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title required!"],
        minlength: [5, "Name should be atleast 3 char"]
    },
    description: {
        type: String,
        required: [true, "Description required!"],
        minlength: [10, "Name should be atleast 3 char"]
    },
    image:{
        type:String,
        default:"https://png.pngtree.com/png-clipart/20230303/ourmid/pngtree-clipart-notebook-notebook-png-image_6629325.png"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}, { timestamps: true });

const Note = mongoose.model("Note", NoteSchema);

export default Note;