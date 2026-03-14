import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
});

export const allProjectCategories = () => async (dispatch) => {
  try {
    const { data } = await API.get("/projects/categories");
    dispatch({ type: "ALL_PROJECT_CATEGORIES", payload: data.projectCategories });
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to fetch project categories");
  }
};

export const allProjects = () => async (dispatch) => {
  try {
    const { data } = await API.get("/projects");
    dispatch({ type: "ALL_PROJECTS", payload: data.projects });
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to fetch projects");
  }
};

export const allEvents = () => async (dispatch) => {
  try {
    const { data } = await API.get("/events");
    dispatch({ type: "ALL_EVENTS", payload: data.events });
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to fetch events");
  }
};

export const allBlogs = () => async (dispatch) => {
  try {
    const { data } = await API.get("/blogs");
    dispatch({ type: "ALL_BLOGS", payload: data.blogs });
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to fetch blogs");
  }
};

export const allNews = () => async (dispatch) => {
  try {
    const { data } = await API.get("/news");
    dispatch({ type: "ALL_NEWS", payload: data.news });
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to fetch news");
  }
};

export const allTours = () => async (dispatch) => {
  try {
    const { data } = await API.get("/tours");
    dispatch({ type: "ALL_TOURS", payload: data.tours });
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to fetch tours");
  }
};

export const allMedia = () => async (dispatch) => {
  try {
    const { data } = await API.get("/media");
    dispatch({ type: "ALL_MEDIA", payload: data.media });
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to fetch media");
  }
};

export const getHeroSection = () => async (dispatch) => {
  try {
    const { data } = await API.get("/hero");
    dispatch({ type: "GET_HERO_SECTION", payload: data.hero });
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to fetch hero section");
  }
};

export const getAbout = () => async (dispatch) => {
  try {
    const { data } = await API.get("/about");
    dispatch({ type: "GET_ABOUT", payload: data });
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to fetch About data");
  }
};

export const getReviews = () => async (dispatch) => {
  try {
    const { data } = await API.get("/reviews");
    dispatch({ type: "GET_REVIEWS", payload: data });
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to fetch reviews");
  }
};

export const addReview = async (review) => {
  try {
    await API.post("/reviews/add", review);
    toast.success("Review added successfully");
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to add review");
  }
};

export const submitParticipation = async (participation) => {
  try {
    await API.post("/projects/participation", participation);
    toast.success("Participation submitted successfully");
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to submit participation");
  }
};

export const createJoinRequest = async (request) => {
  try {
    await API.post("/join", request);
    toast.success("Request submitted successfully");
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to submit request");
  }
};