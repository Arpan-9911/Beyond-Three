import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
});

export const login = (authData) => API.post("/admin/auth/login", authData);
export const logout = () => API.get("/admin/auth/logout");
export const getProfile = () => API.get("/admin/auth/me");

export const getHeroSection = () => API.get("/hero");
export const saveHeading = (data) => API.post("/hero/heading", data);
export const saveImages = (formData) => API.post("/hero/images?folder=hero", formData);
export const saveQuotes = (data) => API.post("/hero/quotes", data);

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

export const getAbout = () => API.get("/about");
export const updateFounder = (formData) => API.post("/about/founder?folder=founder", formData);
export const updateMethodology = (data) => API.post("/about/methodology?folder=methodology", data);
export const updateWhoWeAre = (data) => API.post("/about/who-we-are?folder=whoWeAre", data);
export const updateMissionVision = (data) => API.post("/about/mission-vision", data);
export const addDocument = (formData) => API.post("/about/documents?folder=documents", formData);
export const deleteDocument = (index) => API.delete(`/about/documents/${index}`);
export const addFaq = (data) => API.post("/about/faqs", data);
export const updateFaq = (index, data) => API.put(`/about/faqs/${index}`, data);
export const deleteFaq = (index) => API.delete(`/about/faqs/${index}`);

export const allReviews = () => API.get("/reviews");
export const approveReview = (id) => API.put(`/reviews/approve/${id}`);
export const rejectReview = (id) => API.put(`/reviews/reject/${id}`);

export const allParticipations = () => API.get("/projects/participation");
export const approveParticipation = (id) => API.put(`/projects/participation/approve/${id}`);
export const rejectParticipation = (id) => API.put(`/projects/participation/reject/${id}`);

export const allJoinRequests = () => API.get("/join");
export const approveMember = (id) => API.put(`/join/approve/${id}`);
export const rejectRequest = (id) => API.put(`/join/reject/${id}`);