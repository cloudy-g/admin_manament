// isLoading 的加载框
import React from 'react';
import { Spin, Alert } from 'antd';

export default function Loading() {
  return (
    <>
      <Spin tip="Loading...">
        <Alert
          message="资源加载中，请耐心等待"
          description=""
          type="info"
        />
      </Spin>,
    </>
  )
}