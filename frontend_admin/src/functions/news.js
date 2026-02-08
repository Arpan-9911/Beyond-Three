import * as api from './index.js';
import { toast } from 'react-toastify';

export const allNews = () => async (dispatch) => {
  try {
    const { data } = await api.allNews();
    dispatch({ type: "ALL_NEWS", payload: data.news });
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to fetch news");
  }
};

export const addNews = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addNews(formData);
    dispatch({ type: "ADD_NEWS", payload: data.news });
    toast.success("News added successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to add news");
  }
};

export const updateNews = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.updateNews(id, formData);
    dispatch({ type: "UPDATE_NEWS", payload: data.news });
    toast.success("News updated successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to update news");
  }
};

export const deleteNews = (id) => async (dispatch) => {
  try {
    await api.deleteNews(id);
    dispatch({ type: "DELETE_NEWS", payload: id });
    toast.success("News deleted successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to delete news");
  }
};