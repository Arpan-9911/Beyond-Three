import * as api from './index'
import { toast } from 'react-toastify'

export const allMedia = () => async (dispatch) => {
  try {
    const { data } = await api.allMedia()
    dispatch({ type: "ALL_MEDIA", payload: data.media })
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to fetch media")
  }
}

export const addMedia = (mediaData) => async (dispatch) => {
  try {
    const { data } = await api.addMedia(mediaData)
    dispatch({ type: "ADD_MEDIA", payload: data.media })
    toast.success("Media added successfully")
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to add media")
  }
}

export const deleteMedia = (id) => async (dispatch) => {
  try {
    await api.deleteMedia(id)
    dispatch({ type: "DELETE_MEDIA", payload: id })
    toast.success("Media deleted successfully")
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to delete media")
  }
}