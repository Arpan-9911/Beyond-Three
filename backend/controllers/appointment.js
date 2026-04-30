import Appointment from "../models/appointment.js";

export const createAppointment = async (req, res) => {
  try {
    const { name, email, phone, date, time, notes } = req.body;

    // Basic validation
    if (!name || !phone || !date || !time || !email) {
      return res.status(400).json({
        success: false,
        msg: "Required fields missing",
      });
    }

    const newAppointment = new Appointment({
      name,
      email,
      phone,
      date,
      time,
      notes,
    });

    await newAppointment.save();

    res.status(201).json({
      success: true,
      msg: "Appointment booked successfully",
      data: newAppointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // validate status
    const validStatus = ["pending", "completed", "cancelled"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid status",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        msg: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Status updated",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};