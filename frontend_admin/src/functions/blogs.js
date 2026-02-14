import * as api from './index';
import { toast } from 'react-toastify';

export const allBlogs = () => async (dispatch) => {
  try {
    const { data } = await api.allBlogs();
    dispatch({ type: 'ALL_BLOGS', payload: data.blogs });
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch blogs');
  }
};

export const addBlog = (blogData) => async (dispatch) => {
  try {
    const { data } = await api.addBlog(blogData);
    dispatch({ type: 'ADD_BLOG', payload: data.blog });
    toast.success('Blog added successfully');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to add blog');
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await api.deleteBlog(id);
    dispatch({ type: 'DELETE_BLOG', payload: id });
    toast.success('Blog deleted successfully');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete blog');
  }
};

export const updateBlog = (id, blogData) => async (dispatch) => {
  try {
    const { data } = await api.updateBlog(id, blogData);
    dispatch({ type: 'UPDATE_BLOG', payload: data.blog });
    toast.success('Blog updated successfully');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update blog');
  }
};

export const toggleStatus = (id, status) => async (dispatch) => {
  try {
    await api.toggleStatusBlog(id, { status });
    dispatch(allBlogs());
    toast.success('Blog status updated successfully');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update blog status');
  }
};