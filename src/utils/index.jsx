import { } from 'react'

// 自定义登录页面 hook
export function loginReducer(state, action) {
  const { type } = action;
  switch (type) {
    case 'isLogin':
      return [true, true, false];
    case 'sucess':
      return [false, false, true];
    default:
      throw new Error('无效 行为')
  }
}