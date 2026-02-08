import { combineReducers } from 'redux';
import auth from './auth';
import hero from './heroCarousel';
import news from './news';
import events from './event';
import projectCategories from './projectCategories';
import projects from './projects';

export default combineReducers({ auth, hero, news, events, projectCategories, projects });