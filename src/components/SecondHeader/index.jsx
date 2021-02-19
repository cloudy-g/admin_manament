import React, { useState, useEffect } from 'react'
import { RocketTwoTone } from '@ant-design/icons';
import { formatDate } from '@/utils';
import { connect } from 'react-redux';
const titleMap = {
  'home': '首页',
  'category': '分类管理',
  'product': '商品管理',
  'user': '用户管理',
  'charactor': '角色管理',
  'bar': '柱状图',
  'line': '直线图',
  'pie': '条状图',
}

function SecondHeader({ title }) {
  // 日期处理
  const [date, setDate] = useState();
  useEffect(() => {
    // setDate(formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'));
    let timer = setTimeout(() => {
      setDate(formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    }, 1000)
    return () => {
      timer && clearTimeout(timer);
    }
  });
  // 根据当前路由显示 title
  // let title = titleMap[pathname];
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
export default connect(
  state => ({ title: state.setHead }),
)(SecondHeader)
