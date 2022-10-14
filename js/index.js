// 主页数据渲染
window.addEventListener('load', async () => {
  const {
    data: { overview, year, salaryData, groupData, provinceData },
  } = await axios({
    url: 'dashboard',
  })
  for (let k in overview) {
    document.querySelector(`[name="${k}"]`).innerHTML = overview[k]
  }
  renderSubject(year)
  rendeClass(salaryData)
})

function renderSubject(arr) {
  let myChart = echarts.init(document.getElementById('line'))
  // 指定图表的配置项和数据
  let option = {
    title: {
      text: '2021全学科薪资走势',
      textStyle: {
        lineHeight: 35,
      },
    },
    xAxis: {
      type: 'category',
      data: arr.map((item) => item.month),
      axisLine: {
        lineStyle: {
          type: 'dashed',
          color: 'skyblue',
        },
      },
      axisLabel: {
        color: '#000',
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: 'skyblue',
        },
      },
    },
    series: [
      {
        data: arr.map((item) => item.salary),
        type: 'line',
        smooth: true,
        symbolSize: 10,
        lineStyle: {
          width: 8,
          color: '5f8eff',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.5,
                color: '#c8e2ff', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#fff0', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}

function rendeClass(arr) {
  let myChart = echarts.init(document.getElementById('salary'))
  let option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '3%',
      left: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '75%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 7,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: arr.map((item) => ({
          value: item.g_count + item.b_count,
          name: item.label,
        })),
      },
    ],
  }
  myChart.setOption(option)
}
