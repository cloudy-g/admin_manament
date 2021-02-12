// 使用本地存储对用户状态进行保存  实现维持登录和自动登录功能
// setItem(key,value) getItem(key) removeItem(key)

const store = window.localStorage;
const USER_KEY = 'user';

export default {
  saveUser(value) {
    store.setItem(USER_KEY, JSON.stringify(value));
  },
  getUser() {
    let tem = store.getItem(USER_KEY);
    if (tem) {
      return JSON.parse(tem);
    } else {
      return null;
    }
  },
  // 用于账号注销需要，删除用户
  remove() {
    store.removeItem(USER_KEY);
  }
}