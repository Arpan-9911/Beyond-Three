import Tour from "../models/tours.js";
import fs from "fs";
import path from "path";

export const allTours = async (req, res) => {
  try {
    const tours = await Tour.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tours });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const addTour = async (req, res) => {
  try {
    const title = JSON.parse(req.body.title);
    const description = JSON.parse(req.body.description);
    const highlights = JSON.parse(req.body.highlights);
    const location = JSON.parse(req.body.location);
    const { duration, price } = req.body;

    const titleEn = title.en?.trim();
    const titleHi = title.hi?.trim();
    const descriptionEn = description.en?.trim();
    const descriptionHi = description.hi?.trim();
    const highlightsEn = highlights.en?.trim();
    const highlightsHi = highlights.hi?.trim();
    const locationEn = location.en?.trim();
    const locationHi = location.hi?.trim();

    if (!titleEn && !titleHi) return res.status(400).json({ success: false, msg: "Either English or Hindi title must be provided" });
    if (!descriptionEn && !descriptionHi) return res.status(400).json({ success: false, msg: "Either English or Hindi description must be provided" });
    if (!highlightsEn && !highlightsHi) return res.status(400).json({ success: false, msg: "Either English or Hindi highlights must be provided" });
    if (!locationEn && !locationHi) return res.status(400).json({ success: false, msg: "Either English or Hindi location must be provided" });
    if (!duration) return res.status(400).json({ success: false, msg: "Duration is required" });
    if (!price) return res.status(400).json({ success: false, msg: "Price is required" });
    if (!req.file) return res.status(400).json({ success: false, msg: "Image is required" });

    const newTour = await Tour.create({
      image: req.file.path.replace(/\\/g, "/"),
      title: {
        en: titleEn || "",
        hi: titleHi || "",
      },
      description: {
        en: descriptionEn || "",
        hi: descriptionHi || "",
      },
      highlights: {
        en: highlightsEn || "",
        hi: highlightsHi || "",
      },
      location: {
        en: locationEn || "",
        hi: locationHi || "",
      },
      duration,
      price,
    });
    res.status(201).json({ success: true, tour: newTour });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ success: false, msg: "Tour not found" });
    // delete file if exists
    if (tour.image) {
      const filePath = path.join(process.cwd(), tour.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: "Tour deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ success: false, msg: "Tour not found" });
    const title = JSON.parse(req.body.title);
    const description = JSON.parse(req.body.description);
    const highlights = JSON.parse(req.body.highlights);
    const location = JSON.parse(req.body.location);
    const { duration, price } = req.body;

    const titleEn = title.en?.trim();
    const titleHi = title.hi?.trim();
    const descriptionEn = description.en?.trim();
    const descriptionHi = description.hi?.trim();
    const highlightsEn = highlights.en?.trim();
    const highlightsHi = highlights.hi?.trim();
    const locationEn = location.en?.trim();
    const locationHi = location.hi?.trim();

    if (!titleEn && !titleHi) return res.status(400).json({ success: false, msg: "Either English or Hindi title must be provided" });
    if (!descriptionEn && !descriptionHi) return res.status(400).json({ success: false, msg: "Either English or Hindi description must be provided" });
    if (!highlightsEn && !highlightsHi) return res.status(400).json({ success: false, msg: "Either English or Hindi highlights must be provided" });
    if (!locationEn && !locationHi) return res.status(400).json({ success: false, msg: "Either English or Hindi location must be provided" });
    if (!duration) return res.status(400).json({ success: false, msg: "Duration is required" });
    if (!price) return res.status(400).json({ success: false, msg: "Price is required" });

    if (req.file) {
      // delete old file if exists
      if (tour.image) {
        const filePath = path.join(process.cwd(), tour.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      tour.image = req.file.path.replace(/\\/g, "/");
    }
    tour.title = {
      en: titleEn || "",
      hi: titleHi || "",
    };
    tour.description = {
      en: descriptionEn || "",
      hi: descriptionHi || "",
    };
    tour.highlights = {
      en: highlightsEn || "",
      hi: highlightsHi || "",
    };
    tour.location = {
      en: locationEn || "",
      hi: locationHi || "",
    };
    tour.duration = duration;
    tour.price = price;
    await tour.save();
    res.status(200).json({ success: true, tour });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};