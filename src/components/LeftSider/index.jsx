import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import setHead from '@/redux/action/setHead';
import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { formatUrl, extractMenus, listMapToMenus, getTitle } from '@/utils';
import localStore from '@/utils/localStorageUtils';
import { reqmenuList, currentMenuList } from '@/config'
import { getTargetCharactor } from '@/api/charactor'
import './index.css';
const { Sider } = Layout;
const { SubMenu } = Menu;

function LeftSider({ user, setMenuList, setHead }) {
  const [menulist, setMenulist] = useState([]);
  const history = useHistory();
  // 刷新的时候根据路由选择当前的选中 Tab
  let { pathname } = useLocation();
  let path = pathname.split('/');
  pathname = path[1];
  if (pathname === 'charts') {
    pathname = path[path.length - 1];
  }
  pathname = (pathname == '') || (pathname == 'admin') ? 'home' : pathname;
  let selected = [pathname];
  // 路由处理 ,点击进行路由跳转
  function toRoute(e) {
    let path = e.keyPath;
    if (path[path.length - 1] === 'goods') {
      path.pop();
    }
    path.reverse();
    setHead(getTitle(menulist, [...path]));
    let url = path.join('/');
    // 格式化路由
    history.push(formatUrl(`/${url}`))
  }

  useEffect(async () => {
    // let user = localStore.getUser();
    if (user.name === 'admin') {
      setMenulist(reqmenuList);
      let menus = [];
      listMapToMenus(reqmenuList, menus);
      setMenuList([...menus]);
    } else {
      let current = await getTargetCharactor(user);
      currentMenuList.menuList = extractMenus(current.menus, reqmenuList);
      setMenulist(currentMenuList.menuList);
      setMenuList([...(current.menus || [])]);
    }
  }, []);

  useEffect(() => {
    setHead(getTitle(menulist, [...path]));
  })
  return (
    <>
      <Sider
        className="sider"
      >
        <a className="logo" href="https://github.com/cloudy-g/admin_manament">
          <Logo className="logo-img"></Logo>
          <h1 className="logo-title">后台管理</h1>
        </a>
        <Menu onClick={toRoute} theme="dark" mode="inline" defaultOpenKeys={['goods', 'charts']} selectedKeys={selected}>
          {
            menulist.map(v => {
              if (v && v.children) {
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
              } else if (v) {
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

export default connect(
  state => ({ user: state.userReducer }),
  {
    setHead
  }
)(LeftSider);
