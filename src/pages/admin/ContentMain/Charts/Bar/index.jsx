import React from 'react';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import SimpleButton from '@/components/SimpleButton';

export default function Bar() {
  const getOption = () => {
    return {
      title: {
        text: 'ECharts 柱状图'
      },
      tooltip: {},
      legend: {
        data: ['销量', "库存"]
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      },
      {
        name: '库存',
        type: 'bar',
        data: [21, 26, 56, 20, 20, 50]
      }]
    };
  }
  return (
    <Card extra={
      <div>
        <SimpleButton
          onClick={() => {
          }}
        >更新</SimpleButton>
      </div>} >
      <ReactECharts option={getOption()} />
    </Card>
  )
}
