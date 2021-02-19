import {
  AreaChartOutlined,
  UserOutlined,
  AppstoreOutlined,
  HomeOutlined,
  ContactsOutlined
} from '@ant-design/icons';

// 侧边导航栏层级
export const reqmenuList = [{
  title: '首页',
  key: 'home',
  Icon: HomeOutlined
}, {
  key: 'goods',
  Icon: AppstoreOutlined,
  title: '商品',
  children: [{
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
  children: [{
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
}];

// 当前用户限制权
export let currentMenuList = {
  menuList: null
};