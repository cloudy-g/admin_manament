import axios from 'axios';
// import {
//   useEffect,
//   useContext,
// } from 'react';
// import {
//   useHistory,
//   useLocation
// } from 'react-router-dom';
// import {
//   message
// } from 'antd';
// import {
//   hasPrivilege
// } from '@/utils';
// let CancelToken = axios.CancelToken;
// let self;
//http request 拦截器
export function request(config) {
  let instance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 4000,
  });
  instance.interceptors.response.use(
    res => {
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      return res
    },
    error => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.request.use(
    config => {
      let token = localStorage.getItem('token');
      if (token) {
        config.headers['accessToken'] = token;
      }
      return config
    },
    error => {
      return Promise.reject(error);
    }
  );
  return instance(config);
}
// 自定义路由拦截 hook 
// export const useRouteCancle = function (context) {
//   const {
//     pathname
//   } = useLocation();
//   const {
//     replace
//   } = useHistory();
//   const menus = useContext(context);
//   console.log(self);
//   useEffect(() => {
//     return () => {
//       if (menus) {
//         let flag = !hasPrivilege(pathname, menus);
//         if (flag) {
//           self.cancle('取消请求');
//           message.error('没有权限访问' + pathname + '路由页面');
//           replace('/');
//         }
//       }
//     }
//   })
//   return null;
// }