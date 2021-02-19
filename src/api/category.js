// 用于 category 页面 信息获取以及提交修改数据
import {
  request
} from './request';

import {
  message
} from 'antd';

// 获取分类数据
export function fetchCategory() {
  // 封装错误统一处理
  return new Promise((resolve, reject) => {
    request({
      method: 'get',
      url: '/category',
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      message.error(err);
    })
  })
}

// 向后台提交 更新数据
export function updateCategory(sumData) {
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      url: '/category',
      data: sumData
    }).then((res) => {
      message.success(`${res.data}`);
    }).catch((err) => {
      message.error(err);
    })
  })
}