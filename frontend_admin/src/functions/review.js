import * as api from './index';
import { toast } from 'react-toastify';

export const allReviews = async (dispatch) => {
  try {
    const { data } = await api.allReviews();
    dispatch({ type: "ALL_REVIEWS", payload: data });
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to fetch reviews");
  }
};

export const approveReview = (id) => async (dispatch) => {
  try {
    await api.approveReview(id);
    dispatch({ type: "APPROVE_REVIEW", payload: id });
    toast.success("Review approved successfully");
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to approve review");
  }
};

export const rejectReview = (id) => async (dispatch) => {
  try {
    await api.rejectReview(id);
    dispatch({ type: "REJECT_REVIEW", payload: id });
    toast.success("Review rejected successfully");
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to reject review");
  }
};