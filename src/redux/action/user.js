import {
  LOGIN_USER_FAILED,
  LOGIN_USER_SUCCESS,
  GET_USER,
  REMOVE_USER
} from '../action_Type';
import {
  fetchUser
} from '@/api/login'
import localStore from '@/utils/localStorageUtils';

export const showUser = (data) => ({
  type: LOGIN_USER_SUCCESS,
  data: data
})
export const userFailed = (data) => ({
  type: LOGIN_USER_FAILED,
  data: data
})
export const removeUser = () => ({
  type: REMOVE_USER,
})

export const fetchUserAction = (values, errback, succback) => {
  return async (dispatch) => {
    let res = await fetchUser(values);
    if (res.data.status == 0) {
      dispatch(userFailed({
        errMsg: res.data.msg
      }));
      errback(res.data.msg);
    } else {
      // 缓存用户信息
      localStore.saveUser(res.data);
      dispatch(showUser(res.data));
      succback();
    }
  }
}