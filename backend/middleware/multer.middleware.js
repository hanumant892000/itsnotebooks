import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        let fileName = file.fieldname + Date.now() + ext
        cb(null, fileName);
    }
})

const upload = multer({ storage: storage })
export default upload;