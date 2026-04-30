import Media from '../models/media.js';
import fs from "fs";
import path from "path";

export const allMedia = async (req, res) => {
  try {
    const media = await Media.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, media });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const addMedia = async (req, res) => {
  try {
    const { type, title, url, platform } = req.body;
    const newMedia = await Media.create({ type, title, url, platform });
    newMedia.file = req.file ? req.file.path.replace(/\\/g, "/") : "";
    await newMedia.save();
    res.status(201).json({ success: true, media: newMedia });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const mediaId = req.params.id;
    const media = await Media.findById(mediaId);
    if (!media) return res.status(404).json({ success: false, msg: "Media not found" });
    // delete file if exists
    if (media.url) {
      const filePath = path.join(process.cwd(), media.url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await Media.findByIdAndDelete(mediaId);
    res.status(200).json({ success: true, msg: "Media deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const makeFeatured = async (req, res) => {
  try {
    const mediaId = req.params.id;
    const media = await Media.findById(mediaId);
    if (!media) return res.status(404).json({ success: false, msg: "Media not found" });
    media.featured = !media.featured;
    await media.save();
    res.status(200).json({ success: true, media });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};