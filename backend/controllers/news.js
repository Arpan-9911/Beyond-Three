import News from "../models/news.js";
import fs from "fs";
import path from "path";

export const addNews = async (req, res) => {
  try {
    const title = JSON.parse(req.body.title);
    const content = JSON.parse(req.body.content);
    const titleEn = title.en?.trim();
    const titleHi = title.hi?.trim();
    const contentEn = content.en?.trim();
    const contentHi = content.hi?.trim();
    const date = req.body.date

    if (!titleEn && !titleHi) return res.status(400).json({ success: false, msg: "Either English or Hindi title must be provided" });
    if (!contentEn && !contentHi) return res.status(400).json({ success: false, msg: "Either English or Hindi content must be provided" });
    if (!req.file) return res.status(400).json({ success: false, msg: "Image is required" });
    if (!date) return res.status(400).json({ success: false, msg: "Date is required" });

    const newNews = await News.create({
      image: req.file.path.replace(/\\/g, "/"),
      title: {
        en: titleEn || "",
        hi: titleHi || "",
      },
      content: {
        en: contentEn || "",
        hi: contentHi || "",
      },
      date
    });
    res.status(201).json({ success: true, news: newNews });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ success: false, msg: "News not found" });
    // delete file if exists
    if (news.image) {
      const filePath = path.join(process.cwd(), news.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const allNews = async (req, res) => {
  try {
    const news = await News.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, news });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ success: false, msg: "News not found" });

    const title = JSON.parse(req.body.title);
    const content = JSON.parse(req.body.content);
    const titleEn = title.en?.trim();
    const titleHi = title.hi?.trim();
    const contentEn = content.en?.trim();
    const contentHi = content.hi?.trim();
    const date = req.body.date

    if (!titleEn && !titleHi) return res.status(400).json({ success: false, msg: "Either English or Hindi title must be provided" });
    if (!contentEn && !contentHi) return res.status(400).json({ success: false, msg: "Either English or Hindi content must be provided" });

    if (req.file) {
      if (news.image) {
        const filePath = path.join(process.cwd(), news.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      news.image = req.file.path.replace(/\\/g, "/");
    }
    news.title = {
      en: titleEn || "",
      hi: titleHi || "",
    };
    news.content = {
      en: contentEn || "",
      hi: contentHi || "",
    };
    news.date = date
    await news.save();
    res.status(200).json({ success: true, news });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};