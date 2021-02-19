// 角色请求
import {
  request
} from './request';
import {
  message
} from 'antd';

// 获取角色数据
export function fetchCharactors() {
  return new Promise((resolve, reject) => {
    request({
      method: "get",
      url: '/charactors'
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      message.error('请求出错');
    })
  })
}
// 添加角色数据
export function updateCharactor(role) {
  return new Promise((resolve, reject) => {
    request({
      method: "post",
      url: '/charactor',
      data: role
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      message.error('请求出错');
    })
  })
}
// 删除角色数据
export function delCharactor(role) {
  return new Promise((resolve, reject) => {
    request({
      method: "get",
      url: '/charactor/delete',
      params: {
        name: role.name
      }
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      message.error('请求出错');
    })
  })
}


// 获取指定用户角色
export function getTargetCharactor(account) {
  return new Promise((resolve, reject) => {
    request({
      method: "get",
      url: '/charactor',
      params: {
        type: account.charactor[0]
      }
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      message.error('请求出错');
    })
  })
}