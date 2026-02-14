import * as api from './index';
import { toast } from 'react-toastify';

export const allTours = () => async (dispatch) => {
  try {
    const { data } = await api.allTours();
    dispatch({ type: 'ALL_TOURS', payload: data.tours });
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to fetch tours");
  }
};

export const addTour = (tourData) => async (dispatch) => {
  try {
    const { data } = await api.addTour(tourData);
    dispatch({ type: 'ADD_TOUR', payload: data.tour });
    toast.success("Tour added successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to add tour");
  }
};

export const updateTour = (id, tourData) => async (dispatch) => {
  try {
    const { data } = await api.updateTour(id, tourData);
    dispatch({ type: 'UPDATE_TOUR', payload: data.tour });
    toast.success("Tour updated successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to update tour");
  }
};

export const deleteTour = (id) => async (dispatch) => {
  try {
    await api.deleteTour(id);
    dispatch({ type: 'DELETE_TOUR', payload: id });
    toast.success("Tour deleted successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to delete tour");
  }
};