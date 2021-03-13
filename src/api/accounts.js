// 角色请求
import {
  request
} from './request';
import {
  message
} from 'antd';
import {
  isCancle
} from 'axios'
// 获取用户数据
export function fetchAccounts() {
  return new Promise((resolve, reject) => {
    request({
      method: "get",
      url: '/accounts',
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      message.error('请求出错');
    })

  })
}
// 添加用户数据
export function updateAccount(role) {
  return new Promise((resolve, reject) => {
    request({
      method: "post",
      url: '/account',
      data: role
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      message.error('请求出错');
    })
  })
}
// 删除用户数据
export function delAccount(role) {
  return new Promise((resolve, reject) => {
    request({
      method: "get",
      url: '/account/delete',
      params: {
        key: role.create_time
      }
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      message.error('请求出错');
    })
  })
}