import ProjectCategory from "../models/projectCategory.js";
import Project from "../models/projects.js";
import fs from "fs";
import path from "path";

export const allProjectCategories = async (req, res) => {
  try {
    const projectCategories = await ProjectCategory.find({});
    res.status(200).json({ success: true, projectCategories });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const addProjectCategory = async (req, res) => {
  try {
    const name = JSON.parse(req.body.name);
    const nameEn = name.en?.trim();
    const nameHi = name.hi?.trim();
    if (!nameEn || !nameHi) return res.status(400).json({ success: false, msg: "Both English and Hindi names are required" });
    const newProjectCategory = await ProjectCategory.create({
      name: { en: nameEn, hi: nameHi },
    });
    res.status(201).json({ success: true, projectCategory: newProjectCategory });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const deleteProjectCategory = async (req, res) => {
  try {
    // TODO: Delete all projects associated with this category
    await ProjectCategory.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: "Project Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const allProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const addProject = async (req, res) => {
  try{
    const title = JSON.parse(req.body.title);
    const description = JSON.parse(req.body.description);
    const category = req.body.category;
    const featured = req.body.featured === "true";

    if (!title.en && !title.hi) return res.status(400).json({ success: false, msg: "Either English or Hindi title is required" });
    if (!description.en && !description.hi) return res.status(400).json({ success: false, msg: "Either English or Hindi description is required" });
    if (!category) return res.status(400).json({ success: false, msg: "Category is required" });

    const newProject = await Project.create({
      title,
      description,
      category,
      image: req.file.path.replace(/\\/g, "/"),
      featured
    });
    res.status(201).json({ success: true, project: newProject });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" })
  }
}

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, msg: "Project not found" });
    // delete file if exists
    if (project.image) {
      const filePath = path.join(process.cwd(), project.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, msg: "Project not found" });

    const title = JSON.parse(req.body.title);
    const description = JSON.parse(req.body.description);
    const category = req.body.category;
    const featured = req.body.featured === "true";

    if (!title.en && !title.hi) return res.status(400).json({ success: false, msg: "Either English or Hindi title is required" });
    if (!description.en && !description.hi) return res.status(400).json({ success: false, msg: "Either English or Hindi description is required" });
    if (!category) return res.status(400).json({ success: false, msg: "Category is required" });

    project.title = title;
    project.description = description;
    project.category = category;
    project.featured = featured;
    if (req.file) {
      project.image = req.file.path.replace(/\\/g, "/");
    }
    await project.save();
    res.status(200).json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};