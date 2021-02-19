import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Table, Tooltip, Modal, message, Form, Input, Tree } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LinkButton from '../../../../components/LinkButton';
import SimpleButton from '../../../../components/SimpleButton';
import { fetchCharactors, updateCharactor, delCharactor } from '@/api/charactor'
// import { useRouteCancle } from '@/api/request';
import { formatDate } from '@/utils'
import { reqmenuList as tree, } from '@/config'
import localStore from '@/utils/localStorageUtils';
import { MenusPrivilege } from '../../index'

export default function Charactor() {
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visiblePrivilege, setVisiblePrivilege] = useState(false);
  const [title, setTitle] = useState('');
  const [newData, setNewData] = useState('');
  const [current, setCurrent] = useState(null);
  const [checkeds, setCheckedKeys] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const textInput = useRef(null);
  const { replace } = useHistory();
  // 设置被选中的角色
  const [role, setRole] = useState({});
  // 自动聚焦
  useEffect(() => {
    let timer = setTimeout(() => {
      if (textInput.current) {
        textInput.current.focus({
          cursor: 'end'
        });
      }
    }, 10)
    return () => {
      timer && clearTimeout(timer);
    }
  })
  // 初始化获取数据，进行更新，只执行一次
  useEffect(() => {
    const getData = async () => {
      let res = await fetchCharactors();
      res = res.map(v => {
        v.key = v.create_time;
        return v;
      })
      setDataSource(res);
    }
    getData();
  }, [])
  // useRouteCancle(MenusPrivilege);

  // 更新数据，如果 current 参数存在，则为编辑数据，否则为添加数据，对象都是dataSource
  const updateData = async () => {
    if (newData === '') {
      return message.error('不能输入为空');
    }
    let flag = dataSource.findIndex(v => v.name === newData);
    if (flag !== -1) {
      message.error('重复添加');
    } else {
      let data = null;
      if (current !== null) {
        let tem = [...dataSource];
        let index = dataSource.findIndex(v => v.name === current.name);
        data = tem[index];
        data.name = newData;
        setDataSource(tem);
      } else {
        data = {};
        data.name = newData;
        data.create_time = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
        data.key = data.create_time;
        setDataSource([...dataSource, data]);
      }
      await updateCharactor(data);
      message.success('更新成功');
    }
    setVisible(false);
    setNewData('');
    setCurrent(null);
  }
  // 受控表单
  const handleData = e => {
    setNewData(e.target.value);
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
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      key: 'auth_time',
    },
    {
      title: '授权人',
      dataIndex: 'auth_er',
      key: 'auth_er',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      key: 'operations',
      ellipsis: {
        showTitle: false,
      },
      render: (...row) => (
        <Tooltip className="operation" placement="topLeft">
          <LinkButton onClick={(e) => {
            // 修改当前行的值
            e.stopPropagation();
            setVisible(true);
            setCurrent(row[1]);
            setTitle('修改数据');
            setNewData(row[1].name);
          }}>修改角色</LinkButton>
          <LinkButton onClick={(e) => {
            e.stopPropagation();
            confirmDelete(row[1]);
          }}>删除角色</LinkButton>
        </Tooltip >
      )
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
        await delCharactor(data);
        let tem = [...dataSource];
        let index = dataSource.findIndex(v => v.name === data.name);
        tem.splice(index, 1);
        setDataSource([...tem]);
        message.success('删除成功');
      }
    });
  }
  // 权限设置 发起请求
  const setPrivilege = async () => {
    let data = null;
    data = Object.assign({}, role);
    data.menus = [...checkeds];
    data.auth_time = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
    let user = localStore.getUser();
    data.auth_er = user.name;
    await updateCharactor(data);
    // 设置的权限是自己角色的权限，强制退出（理论上来说自己不能修改自己角色的权限吧）
    if (role.name === user.charactor[0]) {
      localStore.remove();
      message.success('请重新登录');
      replace('/login');
    } else {
      message.success('更新成功');
      // 更新缓存数据
      let tem = [...dataSource];
      let index = tem.findIndex(v => v.name === data.name);
      tem[index] = data;
      setDataSource(tem);
      setVisiblePrivilege(false);
    }
  }
  // 
  const onCheck = (checkedKeys) => {
    setCheckedKeys([...checkedKeys]);
  };

  return (
    <Card title="" extra={
      <div>
        <SimpleButton
          onClick={() => {
            setVisible(true);
            setTitle('创建角色');
          }}
        >创建角色</SimpleButton>
          &nbsp;&nbsp;&nbsp;
        <SimpleButton
          onClick={() => {
            setVisiblePrivilege(true);
            setTitle('设置角色权限');
            setTreeData(tree);
          }}
          disabled={!role.key}
        >设置角色权限</SimpleButton>
      </div>} >
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        pagination={pageOptions}
        rowSelection={{
          type: 'radio',
          columnWidth: '50px',
          selectedRowKeys: [role.key],
          onSelect(record) {
            setRole(record);
          }
        }}
        onRow={record => {
          return {
            // 点击行，设置选中，设置 角色权限设置按钮禁用效果
            onClick: () => {
              setRole(record)
              setCheckedKeys(record.menus);
            },
          };
        }}
      />
      {/* 添加数据时的弹出框 */}
      <Modal
        title={title}
        centered
        visible={visible}
        onOk={() => updateData()}
        onCancel={() => {
          setNewData('')
          setVisible(false)
        }}
      >
        <Form.Item label="角色名称">
          <Input ref={textInput} className="modal-input" type="text" value={newData} onChange={handleData} />
        </Form.Item>
      </Modal>

      {/* 设置角色权限时的弹出框 */}
      <Modal
        title={title}
        centered
        visible={visiblePrivilege}
        onOk={() => setPrivilege()}
        onCancel={() => {
          setCheckedKeys(role.menus)
          setVisiblePrivilege(false)
        }}
      >
        <Form.Item label="角色名称">
          <Input disabled className="modal-input" type="text" value={role.name} />
        </Form.Item>
        <Tree
          selectable={false}
          checkable
          defaultExpandAll
          checkedKeys={checkeds}
          onCheck={onCheck}
          treeData={treeData}
        />
      </Modal>
    </Card>
  )
}



