import React from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { Card, } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../../../../components/LinkButton';
import './index.css';

export default function Detail({ data }) {
  const history = useHistory();
  const { id } = useParams();
  const backToList = () => {
    history.goBack();
  }
  let detailItem = data.find(v => {
    if (v.pid == id) {
      return true;
    } else {
      return false;
    }
  })
  let {
    title, seller, price, src, type
  } = detailItem;
  src = src && src[0] === '/' ? src : `/${src}`;
  return (
    <Card title="" extra={
      <div className="detail-title">
        <ArrowLeftOutlined />
        <LinkButton
          onClick={backToList}
        >返回商品列表</LinkButton>
      </div>} >
      <div className="detail-content">
        <ul>
          <li>
            <p><span className="detail-desc">商品名称:</span> <span className="detail-desc-content">{title}</span>  </p>
          </li>
          <li>
            <p><span className="detail-desc">店铺名称:</span> <span className="detail-desc-content">{seller}</span>  </p>
          </li>
          <li>
            <p><span className="detail-desc">商品价格:</span> <span className="detail-desc-content">{price}</span>  </p>
          </li>
          <li>
            <p><span className="detail-desc">所属分类:</span> <span className="detail-desc-content">{type.join(' > ')}</span>  </p>
          </li>
          <li>
            <p><span className="detail-desc">商品详情:</span> <span style={{ color: 'red' }} className="detail-desc-content">商品火热促销，全国联保</span>  </p>
          </li>
        </ul>
        <p>
          <img className="detail-desc-img" src={`/api1${src}`} alt="商品图片" title={title} />
        </p>
      </div>
    </Card >

  )
}
