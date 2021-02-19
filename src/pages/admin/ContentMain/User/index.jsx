import React, { useState, useEffect } from 'react';

import { Card, Table, Tooltip, Modal, message, Form, Input, Cascader } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import LinkButton from '../../../../components/LinkButton';
import SimpleButton from '../../../../components/SimpleButton';

import { fetchAccounts, updateAccount, delAccount } from '@/api/accounts'
import { fetchCharactors } from '@/api/charactor';
// import { useRouteCancle } from '@/api/request';
import { formatDate, dataMapToOptions } from '@/utils';
// import { MenusPrivilege } from '../../index';

export default function Users() {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [current, setCurrent] = useState(null);
  // 初始化获取数据，进行更新，只执行一次
  useEffect(() => {
    const getData = async () => {
      let res = await fetchAccounts();
      res = res.map(v => {
        v.key = v.create_time;
        return v;
      })
      setDataSource(res);
      let res1 = await fetchCharactors();
      setOptions(dataMapToOptions(res1));
    }
    getData();
  }, [])
  // useRouteCancle(MenusPrivilege);
  // 更新数据，如果 current 参数存在，则为编辑数据，否则为添加数据，对象都是dataSource
  const updateData = async ({ values }) => {
    let data = values;
    if (current !== null) {
      let tem = [...dataSource];
      data = Object.assign({}, current, values);
      let index = dataSource.findIndex(v => v.name === current.name);
      tem[index] = data;
      setDataSource(tem);
    } else {
      let flag = dataSource.findIndex(v => v.name === values.name);
      if (flag !== -1) {
        return message.error('重复添加');
      }
      values.create_time = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
      values.key = values.create_time;
      setDataSource([...dataSource, values]);
    }
    await updateAccount(data);
    message.success('更新成功');
    setVisible(false);
    setCurrent(null);
    form.setFieldsValue({
      name: '',
      password: '',
      tel: '',
      Email: '',
      charactor: '',
    })
  }
  // 分页设置
  const pageOptions = {
    position: ['none', 'bottomRight'],
    showSizeChanger: [3, 5, 10],
    defaultPageSize: 3,
    total: dataSource.length,
    pageSizeOptions: [3, 5, 10],
  }
  // Table 列设置
  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: '邮箱',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '所属角色',
      dataIndex: 'charactor',
      key: 'charactor',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      key: 'operations',
      ellipsis: {
        showTitle: false,
      },
      render: (...row) => {
        return (
          row[1]['name'] === 'admin' ? null :
            (
              <Tooltip className="operation" placement="topLeft">
                <LinkButton onClick={() => {
                  // 修改当前行的值
                  setVisible(true);
                  setTitle('修改用户');
                  setCurrent(row[1]);
                  // 设置表单默认值
                  form.setFieldsValue({
                    name: row[1].name,
                    password: row[1].password,
                    tel: row[1].tel,
                    Email: row[1].Email,
                    charactor: row[1].charactor,
                  })
                }}>修改</LinkButton>
                <LinkButton onClick={() => {
                  confirmDelete(row[1]);
                }}>删除</LinkButton>
              </Tooltip >
            )
        )
      }
    }
  ];
  // 删除数据时的 弹出框
  function confirmDelete(data) {
    Modal.confirm({
      title: '确认提交操作',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await delAccount(data);
        let tem = [...dataSource];
        let index = dataSource.findIndex(v => v.create_time === data.create_time);
        tem.splice(index, 1);
        setDataSource([...tem]);
        message.success('删除成功');
      }
    });
  }

  return (
    <Card title="" extra={
      <SimpleButton
        onClick={() => {
          setVisible(true);
          setTitle('创建角色');
        }}
      >创建角色</SimpleButton>
    } >
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        pagination={pageOptions}
      />
      {/* 添加数据时的弹出框 */}
      <Modal
        title={title}
        centered
        visible={visible}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <Form
          form={form}
          name="confirm"
          onFinish={(values) => updateData({ values })}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="用户名"
            rules={[
              {
                required: true,
                min: 4,
                max: 12,
                pattern: /^\w+$/g,
                message: '用户名必须4-12位，且必须是数字，字母以及下划线的任意组合'
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                min: 4,
                max: 12,
                pattern: /^\w+$/g,
                message: '密码必须4-12位，且必须是数字，字母以及下划线的任意组合'
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tel"
            label="手机号"
            rules={[
              {
                required: true,
                message: 'Please input your exactly tel number!',
                min: 11,
                max: 11
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Email"
            label="邮箱"
            rules={[
              {
                required: true,
                message: 'Please inpur your exactly Email!',
                pattern: /@{1}/g,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="charactor"
            label="角色分类"
            rules={[
              {
                required: true,
                message: 'Please select your charactor!',
              },
            ]}
          >
            <Cascader options={options} placeholder="选择角色分类" />
          </Form.Item>

        </Form>
      </Modal>
    </Card >
  )
}


