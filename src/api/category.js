// 用于 category 页面 信息获取以及提交修改数据
import {
  request
} from './request';

import {
  message
} from 'antd';

// 登录页面 用户信息获取
export function fetchCategory() {
  // 封装错误统一处理
  return new Promise((resolve, reject) => {
    request({
      method: 'get',
      url: '/category',
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      message.error(err);
    })
  })
}