import HeroCarousel from "../models/heroCarousel.js";
import fs from "fs";
import path from "path";

export const addHeroCarousel = async (req, res) => {
  try {
    const name = JSON.parse(req.body.name);
    const quote = JSON.parse(req.body.quote);
    const nameEn = name.en?.trim();
    const nameHi = name.hi?.trim();
    const quoteEn = quote.en?.trim();
    const quoteHi = quote.hi?.trim();

    if (!nameEn && !nameHi) return res.status(400).json({ success: false, msg: "Either English or Hindi name must be provided" });
    if (!quoteEn && !quoteHi) return res.status(400).json({ success: false, msg: "Either English or Hindi quote must be provided" });
    if (!req.file) return res.status(400).json({ success: false, msg: "Image is required" });

    const newHero = await HeroCarousel.create({
      image: req.file.path.replace(/\\/g, "/"),
      name: {
        en: nameEn || "",
        hi: nameHi || "",
      },
      quote: {
        en: quoteEn || "",
        hi: quoteHi || "",
      },
    });
    res.status(201).json({ success: true, slide: newHero });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const allHeroCarousel = async (req, res) => {
  try {
    const slides = await HeroCarousel.find({});
    res.status(200).json({ success: true, slides });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const deleteHeroCarousel = async (req, res) => {
  try {
    const slide = await HeroCarousel.findById(req.params.id);
    if (!slide) return res.status(404).json({ success: false, msg: "Slide not found" });
    // delete file if exists
    if (slide.image) {
      const filePath = path.join(process.cwd(), slide.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await HeroCarousel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: "Slide deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const updateHeroCarousel = async (req, res) => {
  try {
    const slide = await HeroCarousel.findById(req.params.id);
    if (!slide) return res.status(404).json({ success: false, msg: "Slide not found" });

    const name = JSON.parse(req.body.name);
    const quote = JSON.parse(req.body.quote);
    const nameEn = name.en?.trim();
    const nameHi = name.hi?.trim();
    const quoteEn = quote.en?.trim();
    const quoteHi = quote.hi?.trim();

    if (!nameEn && !nameHi) return res.status(400).json({ success: false, msg: "Either English or Hindi name must be provided" });
    if (!quoteEn && !quoteHi) return res.status(400).json({ success: false, msg: "Either English or Hindi quote must be provided" });

    if (req.file) {
      if (slide.image) {
        const filePath = path.join(process.cwd(), slide.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      slide.image = req.file.path.replace(/\\/g, "/");
    }
    slide.name = {
      en: nameEn || "",
      hi: nameHi || "",
    };
    slide.quote = {
      en: quoteEn || "",
      hi: quoteHi || "",
    };
    await slide.save();
    res.status(200).json({ success: true, slide });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};