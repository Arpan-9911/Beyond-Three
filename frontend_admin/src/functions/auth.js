import * as api from './index.js';
import { toast } from 'react-toastify';

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(authData);
    dispatch({ type: "AUTH", payload: data.admin });
    navigate("/dashboard");
    toast.success("Login Successful");
  } catch (error) {
    toast.error(error.response.data.msg || "Login Failed");
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    await api.logout();
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
    navigate("/");
  } catch (error) {
    console.log("Logout error:", error);
    toast.error(error.response?.data?.msg || "Logout failed");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    const { data } = await api.getProfile();
    dispatch({ type: "AUTH", payload: data.admin || null });
  } catch (error) {
    toast.error(error.response.data.msg || "Logout failed");
  }
};