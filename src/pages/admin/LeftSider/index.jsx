import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { AreaChartOutlined, UserOutlined, AppstoreOutlined, HomeOutlined, ContactsOutlined } from '@ant-design/icons';

import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import { formatUrl } from '../../../utils'

const { Sider } = Layout;

export default function LeftSider() {
  const history = useHistory();
  // 刷新的时候根据路由选择当前的选中 Tab
  let { pathname } = useLocation();
  pathname = (pathname == '/') || (pathname == '/admin') ? '/home' : pathname;
  let selected = [pathname.slice(1)];
  // 路由处理 ,点击进行路由跳转
  function toRoute(e) {
    let title = e.item.props.title;
    // 格式化路由
    history.push(formatUrl(`/${title}`))
  }
  return (
    <>
      <Sider
        collapsedWidth="0"
        className="sider"
      >
        <div className="logo" >
          <Logo className="logo-img"></Logo>
          <h1 className="logo-title">后台管理</h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={selected}>
          <Menu.Item title="home" onClick={toRoute} className="list-item" key="home" icon={<HomeOutlined />}>
            首页
        </Menu.Item>
          <Menu.Item title="category" onClick={toRoute} className="list-item" key="category" icon={<AppstoreOutlined />}>
            商品
        </Menu.Item>
          <Menu.Item title="user" onClick={toRoute} className="list-item" key="user" icon={<UserOutlined />}>
            用户管理
        </Menu.Item>
          <Menu.Item title="charactor" onClick={toRoute} className="list-item" key="charactor" icon={<ContactsOutlined />}>
            角色管理
        </Menu.Item>
          <Menu.Item title="chart" onClick={toRoute} className="list-item" key="chart" icon={<AreaChartOutlined />}>
            图形管理
        </Menu.Item>
        </Menu>
      </Sider>
    </>
  )
}
