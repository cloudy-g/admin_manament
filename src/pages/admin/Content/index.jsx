import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout, Button } from 'antd';

import Home from './Home'
import Category from './Category'
import User from './User'
import Charactor from './Charactor'
import Chart from './Chart'
import ContentHeader from '../../../components/ContentHeader'
import SecondHeader from './ContentHeader'

const { Header, Content, Footer } = Layout;

export default function ContentMain({ account }) {
  return (
    <>
      <Layout>
        <Header className="site-layout-sub-header-background content-header" style={{ padding: 0 }} >
          <Button type="link">退出</Button>
          <span>欢迎, {account.username}</span>
        </Header>
        <ContentHeader >
          <SecondHeader></SecondHeader>
        </ContentHeader>
        <Content className="content-main" style={{ margin: '15px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/charactor" component={Charactor}></Route>
              <Route path="/chart" component={Chart}></Route>
              <Redirect to="/home"></Redirect>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>推荐使用Chrome 浏览器</Footer>
      </Layout>
    </>
  )
}
