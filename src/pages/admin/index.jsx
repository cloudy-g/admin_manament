import React from 'react'
import { useHistory } from 'react-router-dom'
import { Layout } from 'antd'

import './index.css'
import LeftSider from './LeftSider'
import ContentMain from './Content'

import localStore from '../../utils/localStorageUtils'

export default function Admin() {
  // 获取账号信息
  const history = useHistory()
  let account = localStore.getUser();
  if (account == null) {
    history.replace('/login')
  }
  return (
    <>
      <Layout id="admin-wrapper">
        <LeftSider></LeftSider>
        <ContentMain account={account}></ContentMain>
      </Layout>,
    </>
  )
}

