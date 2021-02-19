import {
  request
} from './request';


// 获取商品信息
export function fetchProduct() {
  return new Promise((resolve, reject) => {
    request({
      method: 'get',
      url: '/product'
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      console.log(err);
    })
  })
}
// 添加商品信息
export function updateProduct(data) {
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      url: '/product/update',
      data: data
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      console.log(err);
    })
  })
}