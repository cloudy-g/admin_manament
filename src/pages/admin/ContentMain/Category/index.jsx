import React from 'react'
import { Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const data = [{
  title: '汽车',
  children: [{
    title: '别克'
  }, {
    title: '悍马'
  }]
}, {
  title: '牙刷'
}, {
  title: '篮球'
}, {
  title: '衣服'
}]

export default function Category() {
  return (
    <Card title="一级菜单列表" extra={<Button style={{ backgroundColor: "rgb(0, 21, 41)", color: '#fff' }} icon={<PlusOutlined />} >添加</Button>} >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  )
}