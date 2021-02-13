import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { AreaChartOutlined, UserOutlined, AppstoreOutlined, HomeOutlined, ContactsOutlined } from '@ant-design/icons';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { formatUrl } from '../../utils'

const { Sider } = Layout;
const { SubMenu } = Menu;
const reqmenuList = [
  {
    title: '首页',
    key: 'home',
    Icon: HomeOutlined
  }, {
    key: 'goods',
    Icon: AppstoreOutlined,
    title: '商品',
    children: [
      {
        title: '品类管理',
        key: 'category',
      },
      {
        key: 'product',
        title: '商品管理',
      },
    ]
  }, {
    key: 'user',
    title: '用户管理',
    Icon: UserOutlined
  }, {
    title: '角色管理',
    key: 'charactor',
    Icon: ContactsOutlined
  }, {
    key: 'charts',
    Icon: AreaChartOutlined,
    title: '图形管理',
    children: [
      {
        title: '直线图',
        key: 'line',
      },
      {
        title: '直状图',
        key: 'bar',
      }, {
        title: '条状图',
        key: 'pie'
      }
    ]
  }
]

export default function LeftSider({ pathname }) {
  const [menulist, setMenulist] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const history = useHistory();
  // 刷新的时候根据路由选择当前的选中 Tab
  let selected = [pathname];

  // 路由处理 ,点击进行路由跳转
  function toRoute(e) {
    let path = e.keyPath;
    if (path[path.length - 1] === 'goods') {
      path.pop();
    }
    let url = path.reverse().join('/');
    // 格式化路由
    history.push(formatUrl(`/${url}`))
  }

  useEffect(() => {
    Promise.resolve().then(res => {
      setMenulist(reqmenuList)
      // 自动打开含有子列表的选项卡
      let tem = reqmenuList.filter(v => {
        if (v.children) {
          return true;
        }
        return false;
      }).map(v => v.key)
      setOpenKeys(tem);
    })
  }, [])

  return (
    <>
      <Sider
        className="sider"
      >
        <a className="logo" href="https://github.com/cloudy-g/admin_manament">
          <Logo className="logo-img"></Logo>
          <h1 className="logo-title">后台管理</h1>
        </a>
        <Menu onClick={toRoute} theme="dark" mode="inline" openKeys={openKeys} selectedKeys={selected}>
          {
            menulist.map(v => {
              if (v.children) {
                return (
                  <SubMenu key={v.key} icon={<v.Icon />} title={v.title}>
                    {
                      v.children.map(child => {
                        return (
                          <Menu.Item className="list-item" key={child.key} icon={<v.Icon />}>
                            {child.title}
                          </Menu.Item>
                        )
                      })
                    }
                  </SubMenu>)
              } else {
                return (
                  <Menu.Item className="list-item" key={v.key} icon={<v.Icon />}>
                    {v.title}
                  </Menu.Item>
                )
              }
            })
          }
        </Menu>
      </Sider>
    </>
  )
}
