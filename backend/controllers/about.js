import About from "../models/about.js";
import fs from "fs";
import path from "path";

// --- Helper: Get About doc ---
const getAboutDoc = async () => {
  let about = await About.findOne();
  if (!about) {
    about = await About.create({
      founder: {
        name: { en: "", hi: "" },
        title: { en: "", hi: "" },
        description: { en: "", hi: "" },
        image: "",
      },
      whoWeAre: { description: { en: "", hi: "" } },
      missionVision: { mission: { en: "", hi: "" }, vision: { en: "", hi: "" } },
      documents: [],
      faqs: [],
    });
  }
  return about;
};

// -----------------------------
// Get About
// -----------------------------
export const getAbout = async (req, res) => {
  try {
    const about = await getAboutDoc();
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -----------------------------
// Update Founder
// -----------------------------
export const updateFounder = async (req, res) => {
  try {
    let { name, title, description } = req.body;
    const imageFile = req.file;

    if (typeof name === "string") name = JSON.parse(name);
    if (typeof title === "string") title = JSON.parse(title);
    if (typeof description === "string") description = JSON.parse(description);

    const about = await getAboutDoc();
    about.founder.name = name;
    about.founder.title = title;
    about.founder.description = description;
    if (imageFile) {
      if (about.founder.image) {
        const oldPath = path.join(process.cwd(), about.founder.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      about.founder.image = `uploads/founder/${imageFile.filename}`;
    }
    await about.save();
    res.status(200).json({ message: "Founder updated successfully", founder: about.founder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -----------------------------
// Update Who We Are
// -----------------------------
export const updateWhoWeAre = async (req, res) => {
  try {
    let { description } = req.body;
    const about = await getAboutDoc();

    if (typeof description === "string") description = JSON.parse(description);

    about.whoWeAre.description = description;

    await about.save();
    res.status(200).json({ message: "Who We Are updated successfully", whoWeAre: about.whoWeAre });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -----------------------------
// Update Mission & Vision
// -----------------------------
export const updateMissionVision = async (req, res) => {
  try {
    let { mission, vision } = req.body;
    const about = await getAboutDoc();

    if (typeof mission === "string") mission = JSON.parse(mission);
    if (typeof vision === "string") vision = JSON.parse(vision);

    about.missionVision.mission = mission;
    about.missionVision.vision = vision;

    await about.save();
    res.status(200).json({ message: "Mission & Vision updated successfully", missionVision: about.missionVision });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -----------------------------
// Add / Update Documents
// -----------------------------
export const addDocument = async (req, res) => {
  try {
    const { title } = req.body; // { en, hi }
    const file = req.file;
    if (!file) return res.status(400).json({ error: "Document file is required" });

    const about = await getAboutDoc();
    const newDoc = {
      title: JSON.parse(title), // ensure it's an object {en, hi}
      url: `uploads/documents/${file.filename}`,
    };
    about.documents.push(newDoc);

    await about.save();
    res.status(200).json({ message: "Document added", document: newDoc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const { index } = req.params; // index of document in array
    const about = await getAboutDoc();
    const doc = about.documents[index];
    if (!doc) return res.status(404).json({ error: "Document not found" });

    // Delete file from server
    const filePath = path.join(process.cwd(), "public", doc.url);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    about.documents.splice(index, 1);
    await about.save();

    res.status(200).json({ message: "Document deleted", documents: about.documents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -----------------------------
// Add / Update / Delete FAQs
// -----------------------------
export const addFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const about = await getAboutDoc();
    about.faqs.push({ question, answer });
    await about.save();
    res.status(200).json({ message: "FAQ added", faq: { question, answer } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFaq = async (req, res) => {
  try {
    const { index } = req.params;
    const { question, answer } = req.body;
    const about = await getAboutDoc();
    if (!about.faqs[index]) return res.status(404).json({ error: "FAQ not found" });

    about.faqs[index] = { question, answer };
    await about.save();
    res.status(200).json({ message: "FAQ updated", faq: about.faqs[index] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFaq = async (req, res) => {
  try {
    const { index } = req.params;
    const about = await getAboutDoc();
    if (!about.faqs[index]) return res.status(404).json({ error: "FAQ not found" });

    about.faqs.splice(index, 1);
    await about.save();
    res.status(200).json({ message: "FAQ deleted", faqs: about.faqs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
