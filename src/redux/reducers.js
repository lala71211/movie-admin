import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import genreData from './genre/reducer';
import actorData from './actor/reducer';

const reducers = combineReducers({
  menu,
  settings,
  genreData,
  actorData,
});

export default reducers;