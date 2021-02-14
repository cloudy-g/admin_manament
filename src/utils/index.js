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
