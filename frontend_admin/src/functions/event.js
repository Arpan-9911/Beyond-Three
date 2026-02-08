import * as api from './index.js';
import { toast } from 'react-toastify';

export const allEvents = () => async (dispatch) => {
  try {
    const { data } = await api.allEvents();
    dispatch({ type: "ALL_EVENTS", payload: data.events });
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to fetch events");
  }
};

export const addEvent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addEvent(formData);
    dispatch({ type: "ADD_EVENT", payload: data.event });
    toast.success("Event added successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to add event");
  }
};

export const updateEvent = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.updateEvent(id, formData);
    dispatch({ type: "UPDATE_EVENT", payload: data.event });
    toast.success("Event updated successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to update event");
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await api.deleteEvent(id);
    dispatch({ type: "DELETE_EVENT", payload: id });
    toast.success("Event deleted successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to delete event");
  }
};