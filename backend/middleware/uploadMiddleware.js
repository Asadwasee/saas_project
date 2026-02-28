const multer = require('multer');
const path = require('path');

// 1. Storage Setting
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder ka naam
    },
    filename: (req, file, cb) => {
        // Image ka unique naam (Timestamp + Original Name)
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// 2. File Filter (Sirf Images allowed hain)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isMatch = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (isMatch) {
        cb(null, true);
    } else {
        cb(new Error('Only images (jpg, png, webp) are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB Limit
});

module.exports = upload;