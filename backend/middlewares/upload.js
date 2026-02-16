import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = req.query.folder || "others";
    const uploadPath = path.join("uploads", folderName);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith("image/");
  const isVideo = file.mimetype.startsWith("video/");
  const isPdf = file.mimetype === "application/pdf";
  
  if (isImage || isVideo || isPdf) {
    cb(null, true);
  } else {
    cb(new Error("Only images, videos and PDF files are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
});