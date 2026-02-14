import Blog from "../models/blogs.js";
import fs from "fs";
import path from "path";

export const allBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const addBlog = async (req, res) => {
  try {
    const title = JSON.parse(req.body.title);
    const content = JSON.parse(req.body.content);
    const titleEn = title.en?.trim();
    const titleHi = title.hi?.trim();
    const contentEn = content.en?.trim();
    const contentHi = content.hi?.trim();
    const date = req.body.date
    const author = req.body.author
    const status = req.body.status

    if (!titleEn && !titleHi) return res.status(400).json({ success: false, msg: "Either English or Hindi title must be provided" });
    if (!contentEn && !contentHi) return res.status(400).json({ success: false, msg: "Either English or Hindi content must be provided" });
    if (!req.file) return res.status(400).json({ success: false, msg: "Image is required" });
    if (!date) return res.status(400).json({ success: false, msg: "Date is required" });
    if (!author) return res.status(400).json({ success: false, msg: "Author is required" });

    const newBlog = await Blog.create({
      submittedBy: req.user.id,
      image: req.file.path.replace(/\\/g, "/"),
      title: {
        en: titleEn || "",
        hi: titleHi || "",
      },
      content: {
        en: contentEn || "",
        hi: contentHi || "",
      },
      date,
      author,
      status: status || "pending",
    });
    res.status(201).json({ success: true, blog: newBlog });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, msg: "Blog not found" });
    // delete file if exists
    if (blog.image) {
      const filePath = path.join(process.cwd(), blog.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, msg: "Blog not found" });
    const title = JSON.parse(req.body.title);
    const content = JSON.parse(req.body.content);
    const titleEn = title.en?.trim();
    const titleHi = title.hi?.trim();
    const contentEn = content.en?.trim();
    const contentHi = content.hi?.trim();
    const date = req.body.date
    const author = req.body.author
    const status = req.body.status

    if (!titleEn && !titleHi) return res.status(400).json({ success: false, msg: "Either English or Hindi title must be provided" });
    if (!contentEn && !contentHi) return res.status(400).json({ success: false, msg: "Either English or Hindi content must be provided" });
    if (!date) return res.status(400).json({ success: false, msg: "Date is required" });
    if (!author) return res.status(400).json({ success: false, msg: "Author is required" });
    if (req.file) {
      // delete old file if exists
      if (blog.image) {
        const filePath = path.join(process.cwd(), blog.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      blog.image = req.file.path.replace(/\\/g, "/");
    }
    blog.title = {
      en: titleEn || "",
      hi: titleHi || "",
    }
    blog.content = {
      en: contentEn || "",
      hi: contentHi || "",
    }
    blog.date = date
    blog.author = author
    blog.status = status || "pending"
    await blog.save();
    res.status(200).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
}

export const toggleStatus = async (req, res) => {
  try {
    const status = req.body.status
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, msg: "Blog not found" });
    blog.status = status
    await blog.save();
    res.status(200).json({ success: true, blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
}
