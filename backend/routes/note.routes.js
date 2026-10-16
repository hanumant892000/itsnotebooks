import express from 'express'
import userMiddleware from '../middleware/user.middleware.js';
import NoteModel from '../schema/note.model.js';
import upload from '../middleware/multer.middleware.js';

const router = express.Router()

router.post("/create", userMiddleware, upload.single("image") , async (req, res) => {

    const { title, description } = req.body;
    const {path} = req.file
    
    const userId = req.user?._id
    console.log(userId, title, description);

    try {
        const mynote = await NoteModel.create({ title, description, image:path, createdBy: userId })
        console.log(mynote);
        res.send({
            success: true,
            message: "Your notes added successfully!",
            note: mynote
        })
    } catch (error) {
        console.log(error);
        let message = Object.values(error.errors)[0].message;
        res.send({
            success: false,
            message: message || "Internal server error",
        });
    }
});

router.get("", userMiddleware, async (req, res) => {
    const userId = req.user?._id
    try {
        const allNotes = await NoteModel.find({ createdBy: userId }).populate("createdBy")
        res.send({
            success: true,
            message: "Your notes fetched successfully!",
            total_results: allNotes.length,
            notes: allNotes
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Internal server error",
        });
    }

});
router.put("/:noteid", (req, res) => { });


router.delete("/:noteid", userMiddleware, async (req, res) => {
    const { noteid } = req.params
    try {
        const note = await NoteModel.findByIdAndDelete(noteid)
        if (!note) {
            return res.send({
                success: false,
                message: "Note not find",
            });
        }
        res.send({
            success: true,
            message: "Note deleted successfully!",
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Internal server error",
        });
    }
});

export default router;