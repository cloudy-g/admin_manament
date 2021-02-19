import React, { useState, useEffect } from 'react';

import { useHistory, useParams } from 'react-router-dom'
import {
  Card, Form, Input, Cascader, message, Button, Upload, Modal
} from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../../../../components/LinkButton';
import { updateProduct, fetchProduct } from '../../../../../api/product';
import { fetchCategory } from '../../../../../api/category';
import { dataMapToOptions } from '@/utils';
import { nanoid } from 'nanoid';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 4,
    },
    sm: {
      span: 2,
    },
  },
  wrapperCol: {
    xs: {
      span: 18,
    },
    sm: {
      span: 8,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 4,
      offset: 0,
    },
    sm: {
      span: 3,
      offset: 0,
    },
  },
};
const validateValues = (data, sumData) => {
  return !!(sumData.find(v => {
    // 名称不能一样
    if (v.title === data.title) {
      return true;
    } else {
      return false;
    }
  }))
}

export default function Update({ sumData, setSumData, setSource }) {
  const [form] = Form.useForm();
  const history = useHistory();
  const { id } = useParams();
  // 分类设置获取
  const [options, setOptions] = useState([]);
  // 图片预览
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  // 上传图片列表
  const [fileList, setFileList] = useState([]);
  // 图片的访问路径
  const [src, setSrc] = useState('');
  // 对于修改数据获取对应的 id 
  let updateItem = null, updateIndex = -1;
  if (id !== 'add') {
    updateIndex = sumData.findIndex(v => v.pid == id);
    if (updateIndex !== -1) {
      updateItem = sumData[updateIndex];
    }
  }
  // 回退方法
  const backToList = () => {
    history.goBack();
  }
  // 表单提交之后回调
  const onFinish = async (values) => {
    console.log(values);
    let res = null;
    if (updateItem) {
      let tem = { ...updateItem };
      tem.title = values.title;
      tem.seller = values.seller;
      tem.price = values.price;
      tem.type = [...values.type];
      tem.src = src;
      try {
        res = await updateProduct(tem);
      } catch (err) {
        console.log(err);
      }
      let res1 = await fetchProduct();
      res1 = res1.map(v => {
        v.key = v.pid;
        return v;
      })
      setSource(res1);
      setSumData(res1);
    } else {
      // 验证values的数据，封装 生成返回给后台的数据格式
      let flag = validateValues(values, sumData);
      if (flag) {
        message.error('重复添加商品名称')
        return;
      }
      // 整理数据格式
      values.pid = nanoid();
      values.key = values.pid;
      values.price = `￥${values.price}`;
      values.src = src;
      // 发送post请求添加数据
      res = await updateProduct(values);
      setSumData([...sumData, values]);
      setSource([...sumData, values]);
    }
    // 收尾工作
    message.success(res);
    history.replace('/product');
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ file, fileList }) => {
    setFileList(fileList);
    if (file.response) {
      let src = file.response.split('/');
      src.shift();
      setSrc(`/${src.join('/')}`);
    }
  };

  useEffect(() => {
    // 获取最新的分类
    const getOptions = async () => {
      let res = await fetchCategory();
      let target = dataMapToOptions(res, []);
      setOptions(target)
    }
    getOptions();
    // 设置初始值
    if (updateItem) {
      form.setFieldsValue({
        title: updateItem.title,
        seller: updateItem.seller,
        price: updateItem.price,
        type: [updateItem.type],
      });
      updateItem.src = updateItem.src[0] === '/' ? updateItem.src : ('/' + updateItem.src)
      setFileList([{
        uid: -updateIndex,
        name: updateItem.title,
        status: 'done',
        url: 'http://localhost:5000' + updateItem.src
      }])
    }
  }, []);

  return (
    <Card title="" extra={
      <div className="detail-title">
        <ArrowLeftOutlined />
        <LinkButton
          onClick={backToList}
        >返回商品列表</LinkButton>
      </div>} >
      <Form
        {...formItemLayout}
        form={form}
        name="confirm"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="title"
          label="商品名称"
          rules={[
            {
              required: true,
              message: 'Please input your product name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="seller"
          label="店铺名称"
          rules={[
            {
              required: true,
              message: 'Please input your shop name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="商品价格"
          rules={[
            {
              required: true,
              message: 'Please input your product price!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label="商品分类"
          rules={[
            {
              required: true,
              message: 'Please select your habitual residence!',
            },
          ]}
        >
          <Cascader options={options} placeholder="选择商品分类" />
        </Form.Item>

        <Form.Item
          label="商品图片"
          name="src"
          valuePropName="fileList"
        >
          <>
            <Upload
              action="http://localhost:5000/img/upload"
              name="file"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            确认提交
        </Button>
        </Form.Item>
      </Form>

    </Card >
  )
}


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

