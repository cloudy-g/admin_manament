import {
  request
} from './request';

import {
  message
} from 'antd';

// 登录页面 用户信息获取
export function fetchUser(user) {
  // 封装错误统一处理
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      url: '/login',
      data: {
        username: user && user.username,
        password: user && user.password,
      }
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      message.error(err);
      // reject(err);
    })
  })
}