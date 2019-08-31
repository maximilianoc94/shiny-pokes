import { combineReducers } from 'redux';
import pokelist from './pokelist';
import pagination from './pagination';


export default combineReducers({
  pokelist,
  pagination
});
