import * as api from './index';
import { toast } from 'react-toastify';

export const allProjectCategories = () => async (dispatch) => {
  try {
    const { data } = await api.allProjectCategories();
    dispatch({ type: 'ALL_PROJECT_CATEGORIES', payload: data.projectCategories });
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to fetch project categories");
  }
};

export const addProjectCategory = (categoryData) => async (dispatch) => {
  try {
    const { data } = await api.addProjectCategory(categoryData);
    dispatch({ type: 'ADD_PROJECT_CATEGORY', payload: data.projectCategory });
    toast.success("Project category added successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to add project category");
  }
};

export const deleteProjectCategory = (categoryId) => async (dispatch) => {
  try {
    await api.deleteProjectCategory(categoryId);
    dispatch({ type: 'DELETE_PROJECT_CATEGORY', payload: categoryId });
    toast.success("Project category deleted successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to delete project category");
  }
};

export const allProjects = () => async (dispatch) => {
  try {
    const { data } = await api.allProjects();
    dispatch({ type: 'ALL_PROJECTS', payload: data.projects });
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to fetch projects");
  }
};

export const addProject = (projectData) => async (dispatch) => {
  try {
    const { data } = await api.addProject(projectData);
    dispatch({ type: 'ADD_PROJECT', payload: data.project });
    toast.success("Project added successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to add project");
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  try {
    await api.deleteProject(projectId);
    dispatch({ type: 'DELETE_PROJECT', payload: projectId });
    toast.success("Project deleted successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to delete project");
  }
};

export const updateProject = (projectId, projectData) => async (dispatch) => {
  try {
    const { data } = await api.updateProject(projectId, projectData);
    dispatch({ type: 'UPDATE_PROJECT', payload: data.project });
    toast.success("Project updated successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to update project");
  }
};

export const allParticipations = () => async (dispatch) => {
  try {
    const { data } = await api.allParticipations();
    dispatch({ type: 'ALL_PARTICIPATIONS', payload: data });
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to fetch participations");
  }
};

export const approveParticipation = (id) => async (dispatch) => {
  try {
    await api.approveParticipation(id);
    dispatch({ type: 'APPROVE_PARTICIPATION', payload: id });
    toast.success("Participation approved successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to approve participation");
  }
};

export const rejectParticipation = (id) => async (dispatch) => {
  try {
    await api.rejectParticipation(id);
    dispatch({ type: 'REJECT_PARTICIPATION', payload: id });
    toast.success("Participation rejected successfully");
  } catch (error) {
    toast.error(error.response.data.msg || "Failed to reject participation");
  }
};