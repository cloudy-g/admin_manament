import React, { useState, useEffect, useRef,useContext } from 'react';
// import { useLocation, useHistory } from 'react-router-dom';
import { Card, Table, Tooltip, Modal, message, Breadcrumb, Input } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import LinkButton from '../../../../components/LinkButton';
import SimpleButton from '../../../../components/SimpleButton';
import { nanoid } from 'nanoid';
import './index.css';
// import { MenusPrivilege } from '../../index'
import { fetchCategory, updateCategory } from '../../../../api/category'
// import { hasPrivilege } from '@/utils'
export default function Category() {
  // const { pathname } = useLocation();
  // const { replace } = useHistory();
  // const menus = useContext(MenusPrivilege);

  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [newData, setNewData] = useState('');
  const [current, setCurrent] = useState(null);
  const [showChildList, setShowChildList] = useState(false);
  const [sumData, setSumData] = useState([]);
  const [indexChild, setIndexChild] = useState(-1);
  // const [pageIndex, setPageIndex] = useState([1]);
  const textInput = useRef(null);
  // 初始化获取数据，进行更新，只执行一次
  useEffect(() => {
    // setDataSource(data);
    const getData = async () => {
      let res = await fetchCategory();
      setDataSource(res);
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
    let timer = setTimeout(() => {
      if (textInput.current) {
        textInput.current.focus({
          cursor: 'end'
        });
      }
    }, 10)
    return () => {
      timer && clearTimeout(timer)
      // if (menus) {
      //   let flag = !hasPrivilege(pathname, menus);
      //   if (flag) {
      //     message.error('没有权限访问' + pathname + '路由页面');
      //     replace('/');
      //   }
      // }
    }
  })

  // 更新数据，如果 current 参数存在，则为编辑数据，否则为添加数据，对象都是dataSource
  const updateData = () => {
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
    // if (showChildList) {
    //   let tem = [...pageIndex];
    //   tem.pop();
    //   setPageIndex(tem);
    // }
  }
  // 进入子菜单列表
  const changeChildren = (data) => {
    let index = dataSource.findIndex(v => v.name === data.name);
    let childrenList = data.childList || [];
    setIndexChild(index);
    setDataSource(childrenList);
    setShowChildList(true);
    // setPageIndex([...pageIndex, 1]);
  }
  // 受控表单
  const handleData = e => {
    setNewData(e.target.value);
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
        <Tooltip className="menulist-title" placement="topLeft">
          <LinkButton onClick={() => {
            // 修改当前行的值
            setVisible(true);
            setCurrent(row[1]);
            setTitle('修改数据');
            setNewData(row[1].name);

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
  // 提交数据时的 弹出框
  function confirm(sumData) {
    Modal.confirm({
      title: '确认提交',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        updateCategory(sumData);
      }
    });
  }

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
          <SimpleButton
            icon={<PlusOutlined />}
            onClick={() => {
              setVisible(true);
              setTitle('添加数据');
            }}
          >添加</SimpleButton>
          &nbsp;
          <SimpleButton
            onClick={() => confirm(sumData)}
          >确认更改</SimpleButton>
        </div>
      </div>} >
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        pagination={pageOptions}
      />
      {/* 添加新数据的弹出框 */}
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
        <Input ref={textInput} className="modal-input" type="text" value={newData} onChange={handleData} />
      </Modal>
    </Card >
  )
}

