import Event from "../models/event.js";
import fs from "fs";
import path from "path";

export const allEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 }).exec();
    res.status(200).json({ success: true, events: events });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const addEvent = async (req, res) => {
  try {
    const title = JSON.parse(req.body.title);
    const description = JSON.parse(req.body.description);
    const location = JSON.parse(req.body.location);
    const date = req.body.date;
    const time = req.body.time;

    const titleEn = title.en?.trim();
    const titleHi = title.hi?.trim();
    const descriptionEn = description.en?.trim();
    const descriptionHi = description.hi?.trim();
    const locationEn = location.en?.trim();
    const locationHi = location.hi?.trim();

    if(!titleEn && !titleHi) return res.status(400).json({ success: false, msg: "Either English or Hindi title must be provided" });
    if(!descriptionEn && !descriptionHi) return res.status(400).json({ success: false, msg: "Either English or Hindi description must be provided" });
    if(!locationEn && !locationHi) return res.status(400).json({ success: false, msg: "Either English or Hindi location must be provided" });
    if(!date) return res.status(400).json({ success: false, msg: "Date is required" });
    if(!time) return res.status(400).json({ success: false, msg: "Time is required" });
    if(!req.file) return res.status(400).json({ success: false, msg: "Image is required" });

    const newEvent = await Event.create({
      image: req.file.path.replace(/\\/g, "/"),
      title: {
        en: titleEn || "",
        hi: titleHi || "",
      },
      description: {
        en: descriptionEn || "",
        hi: descriptionHi || "",
      },
      location: {
        en: locationEn || "",
        hi: locationHi || "",
      },
      date,
      time
    });
    res.status(201).json({ success: true, event: newEvent });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, msg: "Event not found" });
    // delete file if exists
    if (event.image) {
      const filePath = path.join(process.cwd(), event.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, msg: "Event not found" });

    const title = JSON.parse(req.body.title);
    const description = JSON.parse(req.body.description);
    const location = JSON.parse(req.body.location);
    const date = req.body.date
    const time = req.body.time

    const titleEn = title.en?.trim();
    const titleHi = title.hi?.trim();
    const descriptionEn = description.en?.trim();
    const descriptionHi = description.hi?.trim();
    const locationEn = location.en?.trim();
    const locationHi = location.hi?.trim();

    if(!titleEn && !titleHi) return res.status(400).json({ success: false, msg: "Either English or Hindi title must be provided" });
    if(!descriptionEn && !descriptionHi) return res.status(400).json({ success: false, msg: "Either English or Hindi description must be provided" });
    if(!locationEn && !locationHi) return res.status(400).json({ success: false, msg: "Either English or Hindi location must be provided" });
    if(!date) return res.status(400).json({ success: false, msg: "Date is required" });
    if(!time) return res.status(400).json({ success: false, msg: "Time is required" });

    if (req.file) {
      if (event.image) {
        const filePath = path.join(process.cwd(), event.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      event.image = req.file.path.replace(/\\/g, "/");
    }
    event.title = {
      en: titleEn || "",
      hi: titleHi || "",
    };
    event.description = {
      en: descriptionEn || "",
      hi: descriptionHi || "",
    };
    event.location = {
      en: locationEn || "",
      hi: locationHi || "",
    };
    event.date = date;
    event.time = time;
    await event.save();
    res.status(200).json({ success: true, event });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};