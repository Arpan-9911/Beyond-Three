import * as api from "./index";
import { toast } from 'react-toastify'

export const allJoinRequests = () => async (dispatch) => {
  try {
    const { data } = await api.allJoinRequests();
    dispatch({ type: "ALL_JOIN_REQUESTS", payload: data.requests });
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to fetch join requests");
  }
}

export const acceptJoinRequest = (id) => async (dispatch) => {
  try {
    await api.approveMember(id);
    dispatch({ type: "ACCEPT_JOIN_REQUEST", payload: id });
    toast.success("Join request accepted successfully");
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to accept join request");
  }
}

export const rejectJoinRequest = (id) => async (dispatch) => {
  try {
    await api.rejectRequest(id);
    dispatch({ type: "REJECT_JOIN_REQUEST", payload: id });
    toast.success("Join request rejected successfully");
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to reject join request");
  }
}