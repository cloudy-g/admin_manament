import {
  format
} from 'date-fns'

// 自定义登录页面 hook
export function loginReducer(state, action) {
  const {
    type
  } = action;
  switch (type) {
    case 'isLogin':
      return [true, true];
    case 'success':
      return [false, false];
    case 'failed':
      return [false, false];
    default:
      throw new Error('无效 行为');
  }
}

// 格式化 url
export function formatUrl(url) {
  return url.replace(/(\/){2}/g, '/');
}

// 格式化日期
export function formatDate(date, regExp) {
  return format(date, regExp);
}

// 商品分类转换
export const dataMapToOptions = (data, options) => {
  options = options || [];
  for (let i = 0; i < data.length; i++) {
    let {
      name
    } = data[i];
    options[i] = {};
    options[i]['label'] = name;
    options[i]['value'] = name;
    if (data[i].childList) {
      options[i]['children'] = dataMapToOptions(data[i].childList, []);
    }
  }
  return options;
}

// 抽取导航信息
export const extractMenus = (menus, reqmenuList) => {
  return reqmenuList.map(v => {
    if (menus.includes(v.key)) {
      return v;
    } else if (v.children) {
      let childs = v.children.filter(v => {
        if (menus.includes(v.key)) {
          return true
        } else {
          return false;
        }
      })
      if (childs.length > 0) {
        return Object.assign({}, v, {
          children: childs
        });
      }
    }
  })
}
// 将 reqmenuList 映射为menus
export const listMapToMenus = (reqmenuList, res) => {
  reqmenuList.map(v => {
    res.push(v.key);
    if (v.children) {
      listMapToMenus(v.children, res);
    }
  })
}

// 进入url时，判断是否有权限进入，否则返回false
export const hasPrivilege = (url, menus) => {
  console.log(url);
  console.log(menus);
  let urlArr = url.split('/');
  for (let i = 0; i < urlArr.length; i++) {
    if (urlArr[i] === '') {
      continue;
    }
    if (!menus.includes(urlArr[i])) {
      return false;
    }
  }
  return true;
}