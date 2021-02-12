import React from 'react'
import { useLocation } from 'react-router-dom'
import { RocketTwoTone } from '@ant-design/icons';

import { format } from 'date-fns'

const titleMap = {
  'home': '首页',
  'category': '分类',
  'user': '用户管理',
  'charactor': '角色管理',
  'chart': '图形管理',
}

export default function SecondHeader() {
  // 日期处理
  let date = format(new Date(), 'yyyy-MM-dd')
  // 根据当前路由显示 title
  const { pathname } = useLocation();
  let title = titleMap[pathname.slice(1)];
  return (
    <>
      <div className="content-desc">
        <span className="content-desc-title">{title}
        </span>
        <div className="content-desc-right">
          <span>{date}</span>&nbsp;&nbsp;&nbsp;
                <RocketTwoTone></RocketTwoTone>
        </div>
      </div>
    </>
  )
}
