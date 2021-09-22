import { combineReducers } from 'redux';

import auth from './authReducer';
import alert from './alertReducer';
import categories from './caregoryReducer';

export default combineReducers({
  auth,
  alert,
  categories,
});
