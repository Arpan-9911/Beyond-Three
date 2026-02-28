import * as api from "./index.js";
import { toast } from "react-toastify";


// ================= GET ABOUT =================
export const getAbout = () => async (dispatch) => {
  try {
    const { data } = await api.getAbout();
    dispatch({ type: "GET_ABOUT", payload: data });
  } catch (err) {
    toast.error(err.response?.data?.msg || "Failed to fetch About data");
  }
};


// ================= UPDATE FOUNDER =================
export const updateFounder = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateFounder(formData);
    dispatch({ type: "UPDATE_FOUNDER", payload: data.founder });
    toast.success(data.message);
  } catch (err) {
    toast.error(err.response?.data?.msg || "Failed to update founder");
  }
};

// ================= UPDATE METHODOLOGY =================
export const updateMethodology = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateMethodology(body);
    dispatch({ type: "UPDATE_METHODOLOGY", payload: data.methodology });
    toast.success(data.message);
  } catch (err) {
    toast.error(err.response?.data?.msg || "Failed to update methodology");
  }
};

// ================= UPDATE WHO WE ARE =================
export const updateWhoWeAre = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateWhoWeAre(body);
    dispatch({ type: "UPDATE_WHO_WE_ARE", payload: data.whoWeAre });
    toast.success(data.message);
  } catch (err) {
    toast.error(err.response?.data?.msg || "Failed to update Who We Are");
  }
};


// ================= UPDATE MISSION VISION =================
export const updateMissionVision = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateMissionVision(body);
    dispatch({ type: "UPDATE_MISSION_VISION", payload: data.missionVision });
    toast.success(data.message);
  } catch (err) {
    toast.error(err.response?.data?.msg || "Failed to update Mission & Vision");
  }
};


// ================= ADD DOCUMENT =================
export const addDocument = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addDocument(formData);
    dispatch({ type: "ADD_DOCUMENT", payload: data.document });
    toast.success(data.message);
  } catch (err) {
    toast.error(err.response?.data?.msg || "Failed to add document");
  }
};


// ================= DELETE DOCUMENT =================
export const deleteDocument = (id) => async (dispatch) => {
  try {
    await api.deleteDocument(id);
    dispatch({ type: "DELETE_DOCUMENT", payload: id });
    toast.success("Document deleted successfully");
  } catch (err) {
    toast.error(err.response?.data?.msg || "Failed to delete document");
  }
};


// ================= ADD FAQ =================
export const addFaq = (body) => async (dispatch) => {
  try {
    const { data } = await api.addFaq(body);
    dispatch({ type: "ADD_FAQ", payload: data.faq });
    toast.success(data.message);
  } catch (err) {
    toast.error(err.response?.data?.msg || "Failed to add FAQ");
  }
};


// ================= UPDATE FAQ =================
export const updateFaq = (id, body) => async (dispatch) => {
  try {
    const { data } = await api.updateFaq(id, body);
    dispatch({ type: "UPDATE_FAQ", payload: { id, data: data.faq } });
    toast.success(data.message);
  } catch (err) {
    toast.error(err.response?.data?.msg || "Failed to update FAQ");
  }
};


// ================= DELETE FAQ =================
export const deleteFaq = (id) => async (dispatch) => {
  try {
    await api.deleteFaq(id);
    dispatch({ type: "DELETE_FAQ", payload: id });
    toast.success("FAQ deleted successfully");
  } catch (err) {
    toast.error(err.response?.data?.msg || "Failed to delete FAQ");
  }
};