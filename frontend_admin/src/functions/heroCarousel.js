import * as api from './index.js';
import { toast } from 'react-toastify';

export const getHeroSection = () => async (dispatch) => {
  try {
    const { data } = await api.getHeroSection();
    dispatch({ type: 'GET_HERO_SECTION', payload: data.hero });
  } catch (err) {
    toast.error(err.response?.data?.msg || 'Failed to fetch hero section');
  }
};

export const saveHeading = (heading) => async (dispatch) => {
  try {
    const { data } = await api.saveHeading(heading);
    dispatch({ type: 'SAVE_HEADING', payload: data.hero });
    toast.success(data.msg);
  } catch (err) {
    toast.error(err.response?.data?.msg || 'Failed to save heading');
  }
};

export const saveImages = (formData) => async (dispatch) => {
  try {
    const { data } = await api.saveImages(formData);
    dispatch({ type: 'SAVE_IMAGES', payload: data.hero });
    toast.success(data.msg);
  } catch (err) {
    toast.error(err.response?.data?.msg || 'Failed to save images');
  }
};

export const saveQuotes = (quotes) => async (dispatch) => {
  try {
    const { data } = await api.saveQuotes(quotes);
    dispatch({ type: 'SAVE_QUOTES', payload: data.hero });
    toast.success(data.msg);
  } catch (err) {
    toast.error(err.response?.data?.msg || 'Failed to save quotes');
  }
};