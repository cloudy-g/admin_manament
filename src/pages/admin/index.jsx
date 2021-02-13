import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Layout } from 'antd'

import './index.css'
import LeftSider from '../../components/LeftSider'
import ContentMain from './ContentMain'

import localStore from '../../utils/localStorageUtils'

export default function Admin() {
  // 获取账号信息
  const history = useHistory()
  let account = localStore.getUser();
  if (account == null) {
    history.replace('/login')
  }
  let { pathname } = useLocation();
  let path = pathname.split('/');
  pathname = path[path.length - 1];
  pathname = (pathname == '') || (pathname == 'admin') ? 'home' : pathname;
  return (
    <>
      <Layout id="admin-wrapper">
        <LeftSider pathname={pathname}></LeftSider>
        <ContentMain account={account} pathname={pathname}></ContentMain>
      </Layout>,
    </>
  )
}

