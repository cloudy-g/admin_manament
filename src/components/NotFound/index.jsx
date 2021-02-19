import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Empty, Button } from 'antd';

import srcImg from '@/assets/images/404.png';

export default function NotFound() {
  const { replace } = useHistory();
  const backToHome = () => {
    replace('/home')
  }
  return (
    <Card style={{ border: 'none' }}>
      <Empty
        image={srcImg}
        imageStyle={{
          height: '200px',
        }}
        description={
          <h1>
            您访问的页面不存在
          </h1>
        }
      >
        <Button type="primary" onClick={backToHome}>回到首页</Button>
      </Empty>
    </Card>
  )
}
