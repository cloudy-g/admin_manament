import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect, useLocation, useHistory, } from 'react-router-dom'
import { Layout } from 'antd';
import { connect } from 'react-redux'

import Home from './Home'
import Category from './Category'
import Product from './Product'
import User from './User'
import Charactor from './Charactor'
import Charts from './Charts'
import ContentHeader from '../../../components/ContentHeader'
import SecondHeader from '../../../components/SecondHeader'
import LogOff from '../../../components/LogOff'
import NotFound from '../../../components/NotFound'
import './index.css';

const { Header, Content, Footer } = Layout;

function DynamicRouter(props) {
  const [flag, setFlag] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();
  const { menuList } = props;
  useEffect(() => {
    let path = pathname.split('/')
    if (menuList) {
      let keys = ['detail', 'update'];
      let flag = true;
      for (let i = 0; i < keys.length; i++) {
        if (path.includes(keys[i])) {
          path = 'product';
          flag = false;
          break;
        }
      }
      if (flag) {
        path = path[path.length - 1];
      }
      if (!menuList.includes(path)) {
        history.replace('/home');
      } else {
        setFlag(true);
      }
    }
  }, [pathname, menuList])

  return (
    <>
      { flag && props.children}
    </>
  )
}

function ContentMain({ user, menuList }) {
  return (
    <>
      <Layout className="content">
        <Header className="site-layout-sub-header-background content-header" style={{ padding: 0 }} >
          <LogOff></LogOff>
          <span>欢迎, {user.username || user.name}</span>
        </Header>
        <ContentHeader >
          <SecondHeader></SecondHeader>
        </ContentHeader>
        <Content className="content-main" style={{ margin: '15px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 10, minHeight: 360 }}>
            <DynamicRouter user={user} menuList={menuList}>
              <Switch>
                <Redirect exact from="/" to="/home"></Redirect>
                <Route path="/home" component={Home}></Route>
                <Route path="/category" component={Category}></Route>
                <Route path="/product" component={Product}></Route>
                <Route path="/user" component={User}></Route>
                <Route path="/charactor" component={Charactor}></Route>
                <Route path="/charts" component={Charts}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </DynamicRouter>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>推荐使用Chrome 浏览器提升您的体验</Footer>
      </Layout>
    </>
  )
}
export default connect(
  state => ({ user: state.userReducer })
)(ContentMain)