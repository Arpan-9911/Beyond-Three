import ProjectParticipation from "../models/projectParticipation.js";
import Project from "../models/projects.js";

export const submitParticipation = async (req, res) => {
  try {
    const projectParticipation = await ProjectParticipation.create(req.body);
    res.status(201).json(projectParticipation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getParticipation = async (req, res) => {
  try {
    const projectParticipations = await ProjectParticipation.find()
      .sort({ createdAt: -1 })
      .populate("projectId", "title");
    res.status(200).json(projectParticipations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const approveParticipation = async (req, res) => {
  try {
    const projectParticipation = await ProjectParticipation.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!projectParticipation) return res.status(404).json({ message: "Participation not found" });
    res.status(200).json({ message: "Participation approved successfully", projectParticipation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectParticipation = async (req, res) => {
  try {
    const projectParticipation = await ProjectParticipation.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!projectParticipation) return res.status(404).json({ message: "Participation not found" });
    res.status(200).json({ message: "Participation rejected successfully", projectParticipation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}