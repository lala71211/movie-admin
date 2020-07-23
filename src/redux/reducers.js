import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import genreData from './genre/reducer';
import actorData from './actor/reducer';
import movieData from './movie/reducer';
import todoApp from './todo/reducer';
import commentData from './comment/reducer';
import reviewData from './review/reducer';

const reducers = combineReducers({
  menu,
  settings,
  genreData,
  actorData,
  movieData,
  todoApp,
  commentData,
  reviewData,
});

export default reducers;