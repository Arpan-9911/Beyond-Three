import { combineReducers } from "redux";
import auth from "./auth";
import hero from "./heroCarousel";
import news from "./news";
import events from "./event";
import projectCategories from "./projectCategories";
import projects from "./projects";
import blogs from "./blogs";
import tours from "./tours";
import media from "./media";
import about from "./about";
import review from "./review";
import projectParticipations from "./participation";
import joinUs from "./join";

export default combineReducers({
  auth,
  hero,
  news,
  events,
  projectCategories,
  projects,
  blogs,
  tours,
  media,
  about,
  review,
  projectParticipations,
  joinUs,
});
