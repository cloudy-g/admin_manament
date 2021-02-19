import React from 'react';
import { Button } from 'antd';

export default function SimpleButton(props) {
  return (
    <Button
      type="primary"
      {...props}
    ></Button>

  )
}
