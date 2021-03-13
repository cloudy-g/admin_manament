import {
  format
} from 'date-fns'

// 登录页面 reducer
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
    if (menus && menus.includes(v.key)) {
      return v;
    } else if (v.children) {
      let childs = v.children.filter(v => {
        if (menus && menus.includes(v.key)) {
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

// 比较两个数据得到 title
export function getTitle(list, arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (list[j] && list[j].key === arr[i]) {
        if (list[j].children) {
          arr.shift();
          return getTitle(list[j].children, arr);
        } else {
          return list[j].title;
        }
      }
    }
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (list[j] && list[j].children) {
        return getTitle(list[j].children, arr);
      }
    }
  }
  return null;
}

export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay)
  }
}