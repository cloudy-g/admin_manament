import {
  LOGIN_USER_FAILED,
  LOGIN_USER_SUCCESS,
  GET_USER,
  REMOVE_USER
} from '../action_Type'
import localStore from '@/utils/localStorageUtils'

const inituser = {};
export default (state = inituser, action) => {
  const {
    type,
    data
  } = action;
  switch (type) {
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, data);
    case LOGIN_USER_FAILED:
      return Object.assign({}, data);
    case GET_USER:
      return state;
    case REMOVE_USER:
      return null;
    default:
      return state;
  }
}