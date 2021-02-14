import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Table, Tooltip, Modal, message, Breadcrumb } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../../../components/LinkButton';
import { nanoid } from 'nanoid';
import './index.css'

import { fetchCategory } from '../../../../api/category'

export default function Category() {
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [newData, setNewData] = useState('');
  const [current, setCurrent] = useState(null);
  const [showChildList, setShowChildList] = useState(false);
  const [sumData, setSumData] = useState([]);
  const [indexChild, setIndexChild] = useState(-1);
  // 初始化获取数据，进行更新，只执行一次
  useEffect(() => {
    // setDataSource(data);
    const getData = async () => {
      let res = await fetchCategory();
      console.log(res);
      setDataSource(res.data);
    }
    getData();
  }, [])
  // 缓存总数据
  useEffect(() => {
    if (!showChildList) {
      setSumData(dataSource);
    } else {
      setSumData(state => {
        state[indexChild].childList = dataSource;
        return state;
      });
    }
  })

  // 更新数据，如果 current 参数存在，则为编辑数据，否则为添加数据，对象都是dataSource
  const updateData = () => {
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
        data.key = nanoid();
        setDataSource([...dataSource, data]);
      }
    }
    setVisible(false);
    setNewData('');
    setCurrent(null);
  }
  // 返回到一级列表
  const changeFirst = () => {
    setDataSource(sumData);
    setShowChildList(false);
  }
  // 进入子菜单列表
  const changeChildren = (data) => {
    let index = dataSource.findIndex(v => v.name === data.name);
    let childrenList = data.childList || [];
    setIndexChild(index);
    setDataSource(childrenList);
    setShowChildList(true);
  }
  // 受控表单
  const handleData = e => {
    setNewData(e.target.value);
  }
  // 提交更改的数据到后台
  const commitUpdate = () => {
    setVisible(true);
  }
  // 分页设置
  const pageOptions = {
    position: ['none', 'bottomRight'],
    showQuickJumper: true,
    showSizeChanger: [3, 5, 10],
    defaultPageSize: 3,
    total: dataSource.length,
    pageSizeOptions: [3, 5, 10],
  }
  // Table 列设置
  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      width: '75%',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      ellipsis: {
        showTitle: false,
      },
      render: (...row) => (
        <Tooltip placement="topLeft">
          <LinkButton onClick={() => {
            // 修改当前行的值
            setVisible(true);
            setCurrent(row[1]);
          }}>修改分类</LinkButton>
          {
            !showChildList && <LinkButton onClick={() => {
              // 进入子列表
              changeChildren(row[1]);
            }}>查看子分类</LinkButton>
          }
        </Tooltip>
      ),
    }
  ];

  return (
    <Card title="" extra={
      <div className="menulist-title">
        <Breadcrumb separator=">">
          <Breadcrumb.Item style={{ cursor: 'pointer' }} onClick={changeFirst}>一级菜单列表</Breadcrumb.Item>
          {
            showChildList && <Breadcrumb.Item >二级菜单列表</Breadcrumb.Item>
          }
        </Breadcrumb>
        <div>
          <Button
            style={{ backgroundColor: "rgb(0, 21, 41)", color: '#fff' }}
            icon={<PlusOutlined />}
            onClick={() => {
              setVisible(true)
            }}
            type="primary"
          >添加</Button>
          &nbsp;
          <Button
            style={{ backgroundColor: "rgb(0, 21, 41)", color: '#fff' }}
            onClick={commitUpdate}
            type="primary"
          >确认更改</Button>
        </div>
      </div>} >
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        pagination={pageOptions}
      />
      <Modal
        title="编辑数据"
        centered
        visible={visible}
        onOk={() => updateData()}
        onCancel={() => {
          setNewData('')
          setVisible(false)
        }}
      >
        <input className="modal-input" type="text" value={newData} onChange={handleData} />
      </Modal>
    </Card >
  )
}

