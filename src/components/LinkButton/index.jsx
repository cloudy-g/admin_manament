import React from 'react';
import { Button } from 'antd';
import './index.css';

export default function LinkButton(props) {
  return (
    <>
      <Button className="link-button" {...props}></Button>
    </>
  )
}
