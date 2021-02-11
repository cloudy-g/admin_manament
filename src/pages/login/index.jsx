import React, { useEffect, useReducer } from 'react'

import './index.css'
// 添加一个 svg 作为组件
import { ReactComponent as Logo } from './images/logo.svg';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { fetchUser } from '../../api/login'
import { loginReducer } from '../../utils'

// 登录表单功能
export default function Login(props) {
  const [state, dispatch] = useReducer(loginReducer, [false, false, false]);
  const [isLogining, isDisabled, isSucess] = state;

  const [form] = Form.useForm();
  let timer = null;
  // 表单提交触发操作
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // 点击链接之后，登录按钮禁用，显示正在登录页面
    dispatch({ type: 'isLogin' });
    // 请求及后续操作
    fetchUser(values).then((res) => {
      console.log(res.data);
      // 成功登陆显示提示信息，准备跳转
      dispatch({ type: 'sucess' });

      // 重置表单
      form.setFieldsValue({
        'username': '',
        "password": ''
      });
      // 缓存用户信息
      window.localStorage.setItem('user', JSON.stringify(values));
      // 路由跳转  1秒后跳转到 主页
      timer = setTimeout(() => {
        props.history.replace('/');
      }, 1000)

    }, err => {
      // 抛出错误
      throw new Error(err)
    })
  };

  // 定时器清除
  useEffect(() => {
    timer && clearTimeout(timer)
  })

  return (
    <div className="login">
      <header className="login-header">
        <Logo className="login-logo"></Logo>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-content">
        <h1>用户登录</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请输入密码"

            />
          </Form.Item>
          <Form.Item className="login-button">
            <Button disabled={isDisabled} type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
      {
        isLogining && (<h1 className="is-login">正在登录...</h1>)
      }
      {
        isSucess && (<h1 className="is-login">登录成功...即将跳转</h1>)
      }
    </div>
  )
}

