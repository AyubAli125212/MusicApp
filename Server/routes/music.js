const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const musicController = require('../controllers/musicController');
const router = express.Router();

// Using a relative path from the 'routes' folder
const uploadFolderPath = path.join(__dirname, '../uploads');

// Check if the upload folder exists, create it if it doesn't
if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdirSync(uploadFolderPath);
}

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'file') {
        // Check the file extensions for the music file
        if (file.originalname.match(/\.(mp3|mp4|MP3|MP4)$/)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only MP3 and MP4 files are allowed.'));
        }
    } else if (file.fieldname === 'coverImage') {
        // Check the file extensions for the cover image
        if (file.originalname.match(/\.(jpg|jpeg|png|PNG|JPEG|JPG)$/)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPG and PNG images are allowed for the cover image.'));
        }
    } else {
        // Ignore any other files
        cb(null, false);
    }
};

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadFolderPath);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }),
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB size limit
    }
});

// Handle music retrieval and upload
router.route('/')
    .get(musicController.getAllMusic)
    .post(upload.fields([{ name: 'file', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]), musicController.uploadMusic)
    .put(
        upload.fields([{ name: 'file', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]),
        musicController.updateMusic
    )
// Handle music update and delete
router.route('/:id')
    .delete(musicController.deleteMusic);

module.exports = router;
