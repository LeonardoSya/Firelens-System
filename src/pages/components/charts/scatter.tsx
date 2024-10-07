import { Scatter } from '@ant-design/plots'
import React from 'react'
import countryData from '@/assets/data/country.json'

const ScatterPlot: React.FC = () => {
  const config = {
    title: '火点数量与国土面积散点图',
    data: countryData,
    xField: 'area',
    yField: 'counts',
    colorField: 'counts',
    shapeField: 'circle',
    size: [4, 30],
    theme: 'dark',
    padding: [20, 20, 50, 50],
    scale: {
      color: {
        type: 'log',
        field: 'counts',
        base: 10,
        range: ['#1890ff', '#fa8c16', '#d4380d'],
      },
      x: {
        type: 'log',
        base: 10,
        nice: true,
      },
      y: {
        type: 'log',
        base: 10,
        nice: true,
      },
    },
    tooltip: {
      title: (datum: { country_zh: string, country_en: string }) =>
        `${datum.country_zh} (${datum.country_en})`,
    },
    axis: {
      x: { title: '国土面积（平方公里）' },
      // @ts-ignore
      y: { title: '火点数量', label: null },
    },
  }

  return (
    <div className='h-96 w-full md:h-[40rem] md:w-3/4'>
      <Scatter {...config} />
    </div>
  )
}

export default ScatterPlot
