import React, { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'

import './index.css'
// 添加一个 svg 作为组件
import { ReactComponent as Logo } from '../../assets/images/logo.svg';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  message
} from 'antd'
import { fetchUser } from '../../api/login'
import { loginReducer } from '../../utils/index'
import localStore from '../../utils/localStorageUtils'

// 登录表单功能
export default function Login() {
  const [state, dispatch] = useReducer(loginReducer, [false, false]);
  const [isLogining, isDisabled] = state;
  const [form] = Form.useForm();
  const history = useHistory();
  let timer = null;
  // 需要进行维持表单登录的操作，刷新之后，若是有用户已经登录，则将其账户密码进行填充
  let account = localStore.getUser();
  if (account != null) {
    form.setFieldsValue({
      'username': account.username,
      "password": account.password
    });
  }
  // 表单提交触发操作  async await 使用
  const onFinish = async (values) => {
    // 点击链接之后，登录按钮禁用，显示正在登录页面
    dispatch({ type: 'isLogin' });
    // 请求及后续操作
    let res = await fetchUser(values);
    if (res.data.status == 0) {
      // 用户名或密码不正确
      message.error(res.data.msg);
      dispatch({ type: 'failed' });
    } else {
      dispatch({ type: 'success' });
      message.success('登录成功');
      // 重置表单
      form.setFieldsValue({
        'username': '',
        "password": ''
      });
      // 缓存用户信息
      localStore.saveUser(res.data);
      // 路由跳转  1秒后跳转到 主页
      timer = setTimeout(() => {
        history.replace('/admin');
      }, 1000)
    }
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
              }, {
                type: 'string',
                max: 12,
                min: 4,
                pattern: /^\w+$/g,
                message: '用户名必须4-12位，且必须是数字，字母以及下划线的任意组合'
              }
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
              }, {
                type: 'string',
                max: 12,
                min: 4,
                pattern: /^\w+$/g,
                message: '密码必须4-12位，且必须是数字，字母以及下划线的任意组合'
              }
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
    </div>
  )
}

