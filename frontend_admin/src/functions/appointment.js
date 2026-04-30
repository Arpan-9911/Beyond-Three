import * as api from "./index.js";
import { toast } from "react-toastify";

export const getAppointments = () => async (dispatch) => {
  try {
    const { data } = await api.getAppointments();
    dispatch({ type: "GET_APPOINTMENTS", payload: data.appointments });
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.msg || "Failed to fetch appointments");
  }
};

export const changeStatusAppointment = (id, body) => async (dispatch) => {
  try {
    const { data } = await api.changeStatusAppointment(id, body);
    dispatch({ type: "UPDATE_APPOINTMENT_STATUS", payload: data.appointment });
    toast.success("Appointment status updated successfully");
  } catch (err) {
    toast.error(err.response?.data?.msg || "Failed to update appointment status");
  }
};