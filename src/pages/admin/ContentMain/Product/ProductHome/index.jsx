import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Card, Space, Table, Tooltip, Dropdown, Menu, Input, message } from 'antd';
import { PlusOutlined, ShopOutlined, DownOutlined, ShoppingOutlined } from '@ant-design/icons';
import LinkButton from '../../../../../components/LinkButton';
import SimpleButton from '../../../../../components/SimpleButton';
import { updateProduct } from '../../../../../api/product'
import './index.css';


export default function ProductHome({ data, dataSource, setSource, memKey, setMemKey }) {
  const history = useHistory();
  const [keyword, setKeyword] = useState('title');
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    // filterKey();
    if (memKey === '') {
      setSource(data);
    }
  });
  // 设置上下架状态
  const activeClass = 'active-status';
  // Table 列设置
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
    },
    {
      title: '店铺名称',
      dataIndex: 'seller',
      key: 'seller',
      width: '45%',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (...row) => (
        <Tooltip className="showStatus" placement="topLeft">
          {
            row[1].status == '0' ? (
              <div>
                <LinkButton onClick={async () => {
                  row[1].status = '1';
                  await updateProduct(row[1]);
                  // 找到当前row的对应在dataSource中的位置，进行提交后台更改
                  setSource(source => {
                    source[row[2]] = row[1];
                    return [...source]
                  })
                }} className={activeClass}>下架</LinkButton>
                <span>在售</span>
              </div>
            ) : (
                <div>
                  <LinkButton onClick={async () => {
                    row[1].status = '0';
                    await updateProduct(row[1]);
                    // 找到当前row的对应在dataSource中的位置，进行提交后台更改
                    setSource(source => {
                      source[row[2]] = row[1];
                      return [...source]
                    })
                  }} className={activeClass}>上架</LinkButton>
                  <span>已下架</span>
                </div>
              )
          }
        </Tooltip>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate1',
      ellipsis: {
        showTitle: false,
      },
      render: (...row) => (
        <Tooltip className="operation" placement="topLeft">
          <LinkButton onClick={() => {
            // 修改当前行的值
            toAddOrUpdate(row[1])
          }}>修改</LinkButton>
          <LinkButton onClick={() => {
            history.push(`/product/detail/${row[1].key}`)
          }}>详情</LinkButton>
        </Tooltip>
      ),
    }
  ];
  // 分页设置
  const pageOptions = {
    current: current,
    position: ['none', 'bottomRight'],
    showQuickJumper: true,
    showSizeChanger: [3, 5, 10],
    defaultPageSize: 3,
    total: dataSource.length,
    pageSizeOptions: [3, 5, 10],
  }

  const toAddOrUpdate = (row) => {
    let base = '/product/update';
    if (row) {
      history.push(base + `/${row.key}`)
    } else {
      history.push(base + '/add')
    }
  }

  function handleMenuClick(e) {
    setKeyword(e.key);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="title" icon={<ShoppingOutlined />}>
        按商品名称搜索
    </Menu.Item>
      <Menu.Item key="seller" icon={<ShopOutlined />}>
        按店铺名称搜索
    </Menu.Item>
    </Menu>
  );

  const filterKey = () => {
    if (memKey === '') {
      return message.error('请输入关键字')
    }
    let tem = data.filter(v => {
      if (v[keyword].indexOf(memKey) !== -1) {
        return true;
      } else {
        return false;
      }
    })
    setCurrent(1);
    setSource(tem);
    setMemKey(memKey);
  }
  const collectText = (e) => {
    setMemKey(e.target.value)
  }

  return (
    <Card title="" extra={
      <div className="menulist-title">
        <div className="serch_product">
          <Space wrap>
            <Dropdown.Button icon={<DownOutlined />} trigger={['click']} overlay={menu}>
              按{keyword === 'title' ? '商品' : "店铺"}名称搜索
          </Dropdown.Button>
          </Space>
          <Input className="search_input" placeholder="关键字" value={memKey} onChange={collectText}></Input>
          <SimpleButton
            onClick={() => {
              filterKey()
            }}
          >搜索</SimpleButton>
          <SimpleButton
            style={{ marginLeft: "10px" }}
            onClick={() => {
              setSource(data);
              setMemKey('');
              setCurrent(1);
            }}
          >重置</SimpleButton>
        </div>
        <SimpleButton
          icon={<PlusOutlined />}
          onClick={() => toAddOrUpdate()}
        >添加商品</SimpleButton>
      </div>} >
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        pagination={pageOptions}
        onChange={(e) => {
          setCurrent(e.current);
        }}
      />
    </Card>
  )
}
