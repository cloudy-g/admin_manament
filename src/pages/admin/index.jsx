import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import LeftSider from '../../components/LeftSider';
import ContentMain from './ContentMain';
import './index.css';
import { connect } from 'react-redux';
export const MenusPrivilege = createContext();
const { Provider } = MenusPrivilege;

function Admin({ user }) {
  const [menuList, setMenuList] = useState(null);
  // 获取账号信息
  const history = useHistory();
  if (user == null) {
    history.replace('/login')
  }

  return (
    <Layout id="admin-wrapper">
      <LeftSider setMenuList={setMenuList}></LeftSider>
      <Provider value={menuList}>
        <ContentMain></ContentMain>
      </Provider>
    </Layout>
  )
}
export default connect(
  state => ({ user: state.userReducer })
  , null
)(Admin)

