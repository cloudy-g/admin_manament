import React from 'react'
import { useHistory } from 'react-router-dom'
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import './index.css'
import localStore from '../../utils/localStorageUtils'

function confirm(replace) {
  Modal.confirm({
    title: '确认退出',
    icon: <ExclamationCircleOutlined />,
    content: '',
    okText: '确认',
    cancelText: '取消',
    onOk() {
      localStore.remove();
      replace('/login')
    }
  });
}

export default function LogOff() {
  const { replace } = useHistory();
  return (
    <Space>
      <Button id="log-off" onClick={() => confirm(replace)}>退出</Button>
    </Space>
  )
}