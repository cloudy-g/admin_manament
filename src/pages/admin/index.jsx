import React, { useState, createContext,useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import LeftSider from '../../components/LeftSider';
import ContentMain from './ContentMain';
import './index.css';

import localStore from '../../utils/localStorageUtils';
export const MenusPrivilege = createContext();
const { Provider } = MenusPrivilege;
export default function Admin() {
  const [menuList, setMenuList] = useState(null);
  // 获取账号信息
  const history = useHistory();
  let account = localStore.getUser();
  if (account == null) {
    history.replace('/login')
  }
  let { pathname } = useLocation();
  let path = pathname.split('/');
  pathname = path[1];
  if (pathname === 'charts') {
    pathname = path[path.length - 1];
  }
  pathname = (pathname == '') || (pathname == 'admin') ? 'home' : pathname;
  return (
    <Layout id="admin-wrapper">
      <LeftSider setMenuList={setMenuList} pathname={pathname}></LeftSider>
      <Provider value={menuList}>
        <ContentMain account={account} pathname={pathname}></ContentMain>
      </Provider>
    </Layout>
  )
}

