import React from 'react'
import { Route, Switch, Redirect, } from 'react-router-dom'
import { Layout } from 'antd';

import Home from './Home'
import Category from './Category'
import Product from './Product'
import User from './User'
import Charactor from './Charactor'
import Charts from './Charts'
import ContentHeader from '../../../components/ContentHeader'
import SecondHeader from '../../../components/SecondHeader'
import LogOff from '../../../components/LogOff'

const { Header, Content, Footer } = Layout;

export default function ContentMain({ account, pathname }) {
  return (
    <>
      <Layout>
        <Header className="site-layout-sub-header-background content-header" style={{ padding: 0 }} >
          <LogOff></LogOff>
          <span>欢迎, {account.username}</span>
        </Header>
        <ContentHeader >
          <SecondHeader pathname={pathname}></SecondHeader>
        </ContentHeader>
        <Content className="content-main" style={{ margin: '15px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 10, minHeight: 360 }}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/charactor" component={Charactor}></Route>
              <Route path="/charts" component={Charts}></Route>
              <Redirect to="/home"></Redirect>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>推荐使用Chrome 浏览器提升您的体验</Footer>
      </Layout>
    </>
  )
}
