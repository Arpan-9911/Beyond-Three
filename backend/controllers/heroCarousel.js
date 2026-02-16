import HeroSection from "../models/hero.js";
import fs from "fs";
import path from "path";

// ================= GET HERO SECTION =================
export const getHeroSection = async (req, res) => {
  try {
    const hero = await HeroSection.findOne();
    if (!hero) return res.status(404).json({ msg: "Hero section not found", hero: null });
    res.status(200).json({ msg: "Hero section fetched", hero });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", hero: null });
  }
};

// ================= SAVE / UPDATE HEADING =================
export const saveHeading = async (req, res) => {
  try {
    const { heading } = req.body; // { en: "", hi: "" }
    if (!heading || !heading.en || !heading.hi) {
      return res.status(400).json({ msg: "Heading is required", hero: null });
    }
    let hero = await HeroSection.findOne();
    if (hero) {
      hero.heading = heading;
      await hero.save();
      return res.status(200).json({ msg: "Heading updated", hero });
    }
    hero = new HeroSection({ heading, images: [], quotes: [] });
    await hero.save();
    res.status(201).json({ msg: "Heading created", hero });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", hero: null });
  }
};

// ================= SAVE / UPDATE IMAGES =================
export const saveImages = async (req, res) => {
  try {
    let hero = await HeroSection.findOne();
    if (!hero) {
      hero = new HeroSection({ heading: { en: "", hi: "" }, quotes: [], images: Array(5).fill(null) });
    }

    // Ensure hero.images has 5 slots
    hero.images = hero.images || Array(5).fill(null);
    while (hero.images.length < 5) hero.images.push(null);

    // Parse existing images
    const existingImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
    existingImages.forEach((img, idx) => {
      if (img) hero.images[idx] = img; // overwrite existing slot
    });

    // Parse uploaded files and their indexes
    const files = req.files || [];
    const indexes = req.body.imageIndexes ? JSON.parse(req.body.imageIndexes) : [];
    files.forEach((file, i) => {
      const idx = parseInt(indexes[i]);
      if (!isNaN(idx)) {
        hero.images[idx] = `uploads/hero/${file.filename}`;
      }
    });

    await hero.save();
    res.status(200).json({ msg: "Images updated", hero });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", hero: null });
  }
};


// ================= SAVE / UPDATE QUOTES =================
export const saveQuotes = async (req, res) => {
  try {
    let { quotes } = req.body;
    if (!quotes) return res.status(400).json({ msg: "Quotes required", hero: null });
    if (typeof quotes === "string") {
      quotes = JSON.parse(quotes);
    }
    if (!Array.isArray(quotes)) {
      return res.status(400).json({ msg: "Quotes must be an array", hero: null });
    }
    let hero = await HeroSection.findOne();
    if (!hero) {
      hero = new HeroSection({ heading: { en: "", hi: "" }, images: [], quotes });
      await hero.save();
      return res.status(201).json({ msg: "Quotes added", hero });
    }
    hero.quotes = quotes;
    await hero.save();
    res.status(200).json({ msg: "Quotes updated", hero });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", hero: null });
  }
};
