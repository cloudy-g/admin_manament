import React, { useState, createContext } from 'react';
import { Layout } from 'antd';
import LeftSider from '../../components/LeftSider';
import ContentMain from './ContentMain';
import './index.css';
export const MenusPrivilege = createContext();
const { Provider } = MenusPrivilege;

export default function Admin() {
  const [menuList, setMenuList] = useState(null);
  // 获取账号信息
  return (
    <Layout id="admin-wrapper">
      <LeftSider setMenuList={setMenuList}></LeftSider>
      <Provider value={menuList}>
        <ContentMain menuList={menuList}></ContentMain>
      </Provider>
    </Layout>
  )
}

