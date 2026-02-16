import { combineReducers } from 'redux';

const projects = (state = [], action) => {
  switch (action.type) {
    case "ALL_PROJECTS":
      return action.payload;
    default:
      return state;
  }
};

const projectCategories = (state = [], action) => {
  switch (action.type) {
    case "ALL_PROJECT_CATEGORIES":
      return action.payload;
    default:
      return state;
  }
};

const events = (state = [], action) => {
  switch (action.type) {
    case "ALL_EVENTS":
      return action.payload;
    default:
      return state;
  }
};

const blogs = (state = [], action) => {
  switch (action.type) {
    case "ALL_BLOGS":
      return action.payload;
    default:
      return state;
  }
};

const news = (state = [], action) => {
  switch (action.type) {
    case "ALL_NEWS":
      return action.payload;
    default:
      return state;
  }
};

const tours = (state = [], action) => {
  switch (action.type) {
    case "ALL_TOURS":
      return action.payload;
    default:
      return state;
  }
};

const media = (state = [], action) => {
  switch (action.type) {
    case "ALL_MEDIA":
      return action.payload;
    default:
      return state;
  }
};

const hero = (state = {}, action) => {
  switch (action.type) {
    case "GET_HERO_SECTION":
      return action.payload;
    default:
      return state;
  }
};

const about = (state = {}, action) => {
  switch (action.type) {
    case "GET_ABOUT":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  projectCategories,
  projects,
  events,
  blogs,
  news,
  tours,
  media,
  hero,
  about
});