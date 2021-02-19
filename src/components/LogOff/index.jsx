import React from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LinkButton from '../LinkButton'
import './index.css';
import localStore from '../../utils/localStorageUtils';
import { connect } from 'react-redux';
import { removeUser } from '../../redux/action/user';

function confirm({ replace, removeUser }) {
  Modal.confirm({
    title: '确认退出',
    icon: <ExclamationCircleOutlined />,
    content: '',
    okText: '确认',
    cancelText: '取消',
    onOk() {
      localStore.remove();
      removeUser();
      replace('/login');
    }
  });
}

function LogOff({ removeUser }) {
  const { replace } = useHistory();
  return (
    <Space>
      <LinkButton onClick={() => confirm({ replace, removeUser })}>退出</LinkButton>
      {/* <Button id="log-off" onClick={() => confirm(replace)}>退出</Button> */}
    </Space>
  )
}
export default connect(null, {
  removeUser
})(LogOff)