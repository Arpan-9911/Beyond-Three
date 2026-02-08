import * as api from './index.js';
import { toast } from 'react-toastify';

export const addHeroCarousel = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addHeroCarousel(formData);
    dispatch({ type: "ADD_HERO_CAROUSEL", payload: data.slide });
    toast.success("Hero Carousel added successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to add hero carousel");
  }
};

export const allHeroCarousel = () => async (dispatch) => {
  try {
    const { data } = await api.allHeroCarousel();
    dispatch({ type: "ALL_HERO_CAROUSEL", payload: data.slides });
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to fetch hero carousel");
  }
};

export const deleteHeroCarousel = (id) => async (dispatch) => {
  try {
    await api.deleteHeroCarousel(id);
    dispatch({ type: "DELETE_HERO_CAROUSEL", payload: id });
    toast.success("Hero Carousel deleted successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to delete hero carousel");
  }
};

export const updateHeroCarousel = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.updateHeroCarousel(id, formData);
    dispatch({ type: "UPDATE_HERO_CAROUSEL", payload: data.slide });
    toast.success("Hero Carousel updated successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to update hero carousel");
  }
};