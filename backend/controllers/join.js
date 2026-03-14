import JoinRequest from "../models/join.js";
import bcrypt from "bcryptjs";

/* CREATE REQUEST */
export const createJoinRequest = async (req, res) => {
  try {
    const data = req.body;

    if (data.type === "member") {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    const request = await JoinRequest.create(data);
    res.status(201).json({
      success: true,
      msg: "Request submitted successfully",
      request,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* GET ALL REQUESTS */
export const getAllRequests = async (req, res) => {
  try {
    const requests = await JoinRequest.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveMember = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await JoinRequest.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    request.status = "approved";
    await request.save();
    res.json({
      success: true,
      message: "Member approved",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await JoinRequest.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    request.status = "rejected";
    await request.save();
    res.json({
      success: true,
      message: "Request rejected",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};