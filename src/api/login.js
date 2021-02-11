import {
  request
} from './request'

// 登录页面 用户信息获取

export function fetchUser(user) {
  return request({
    method: 'post',
    url: '/login',
    data: {
      username: user.username,
      password: user.password,
    }
  })
}