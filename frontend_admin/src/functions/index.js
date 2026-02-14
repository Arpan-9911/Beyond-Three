import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
});

export const login = (authData) => API.post("/admin/auth/login", authData);
export const logout = () => API.get("/admin/auth/logout");
export const getProfile = () => API.get("/admin/auth/me");

export const allHeroCarousel = () => API.get("/hero-carousel");
export const addHeroCarousel = (data) => API.post("/hero-carousel/add?folder=hero" , data);
export const deleteHeroCarousel = (id) => API.delete(`/hero-carousel/delete/${id}`);
export const updateHeroCarousel = (id, data) => API.put(`/hero-carousel/update/${id}?folder=hero`, data);

export const allNews = () => API.get("/news");
export const addNews = (data) => API.post("/news/add?folder=news", data);
export const deleteNews = (id) => API.delete(`/news/delete/${id}`);
export const updateNews = (id, data) => API.put(`/news/update/${id}?folder=news`, data);

export const allEvents = () => API.get("/events");
export const addEvent = (data) => API.post("/events/add?folder=events", data);
export const deleteEvent = (id) => API.delete(`/events/delete/${id}`);
export const updateEvent = (id, data) => API.put(`/events/update/${id}?folder=events`, data);

export const allProjectCategories = () => API.get("/projects/categories");
export const addProjectCategory = (data) => API.post("/projects/categories/add", data);
export const deleteProjectCategory = (id) => API.delete(`/projects/categories/delete/${id}`);

export const allProjects = () => API.get("/projects");
export const addProject = (data) => API.post("/projects/add?folder=projects", data);
export const deleteProject = (id) => API.delete(`/projects/delete/${id}`);
export const updateProject = (id, data) => API.put(`/projects/update/${id}?folder=projects`, data);

export const allBlogs = () => API.get("/blogs");
export const addBlog = (data) => API.post("/blogs/add?folder=blogs", data);
export const deleteBlog = (id) => API.delete(`/blogs/delete/${id}`);
export const updateBlog = (id, data) => API.put(`/blogs/update/${id}?folder=blogs`, data);
export const toggleStatusBlog = (id, data) => API.patch(`/blogs/status/${id}`, data);

export const allTours = () => API.get("/tours");
export const addTour = (data) => API.post("/tours/add?folder=tours", data);
export const deleteTour = (id) => API.delete(`/tours/delete/${id}`);
export const updateTour = (id, data) => API.put(`/tours/update/${id}?folder=tours`, data);

export const allMedia = () => API.get("/media");
export const addMedia = (data) => API.post("/media/add?folder=media", data);
export const deleteMedia = (id) => API.delete(`/media/delete/${id}`);
