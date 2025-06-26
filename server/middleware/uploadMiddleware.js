// uploadMiddleware.js
import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // make sure 'uploads' folder exists in root directory
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Create multer instance
const upload = multer({ storage });

export default upload;
