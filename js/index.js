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
  renderClass(salaryData)
  renderGroupChart(groupData)
  renderSalaryPieChart(salaryData)
  renderMap(provinceData)
})
// 渲染全学科走势
function renderSubject(arr) {
  let myChart = echarts.init(document.getElementById('line'))
  // 指定图表的配置项和数据
  let option = {
    title: {
      text: '2021全学科薪资走势',
      top: '3%',
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
// 班级薪资分布
function renderClass(arr) {
  let myChart = echarts.init(document.getElementById('salary'))
  let option = {
    title: {
      text: '班级薪资分布',
      top: '3%',
    },
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
// 班级每组薪资
function renderGroupChart(obj) {
  let myChart = echarts.init(document.getElementById('lines'))
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          type: 'dashed',
          color: '#999',
        },
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
        name: '期望薪资',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 630230],
      },
      {
        name: '就业薪资',
        type: 'bar',
        data: [19325, 23438, 31000, 121594, 134141, 681807],
      },
    ],
    color: [
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#19CAAD', // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#19CAAD20', // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#F4606C', // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#F4606C20', // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
    ],
  }
  myChart.setOption(option)
  // 渲染小组选项
  let str = ''
  for (let k in obj) {
    str += `<button type="button" class="btn btn-xs">${k}</button>`
  }
  document.getElementById('btns').innerHTML = str
  // 事件委托点击事件
  document.getElementById('btns').addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
      document.querySelectorAll('#btns button').forEach((item) => {
        item.className = 'btn btn-xs'
      })
      e.target.classList.add('btn-blue')

      // 数据修改并重新渲染
      myChart.setOption(
        (option = {
          xAxis: { data: obj[e.target.innerHTML].map((item) => item.name) },
          series: [
            {
              data: obj[e.target.innerHTML].map((item) => item.hope_salary),
            },
            {
              data: obj[e.target.innerHTML].map((item) => item.salary),
            },
          ],
        })
      )
    }
  })
  document.querySelector('#btns button').click()
}
// 男女薪资分布
function renderSalaryPieChart(arr) {
  let myChart = echarts.init(document.getElementById('gender'))
  let option = {
    title: [
      {
        text: '男女薪资分布',
        top: '3%',
      },
      {
        text: '男生',
        top: '43%',
        left: '50%',
        textAlign: 'center',
      },
      {
        text: '女生',
        top: '87%',
        left: '50%',
        textAlign: 'center',
      },
    ],
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: '男生',
        type: 'pie',
        radius: ['30%', '40%'],
        center: ['50%', '28%'],
        data: arr.map((item) => ({
          value: item.b_count,
          name: item.label,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
      {
        name: '女生',
        type: 'pie',
        radius: ['30%', '40%'],
        center: ['50%', '72%'],
        data: arr.map((item) => ({
          value: item.g_count,
          name: item.label,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  myChart.setOption(option)
}
// 籍贯分布
function renderMap(arr) {
  let myChart = echarts.init(document.getElementById('map'))
  const dataList = [
    { name: '南海诸岛', value: 0 },
    { name: '北京', value: 0 },
    { name: '天津', value: 0 },
    { name: '上海', value: 0 },
    { name: '重庆', value: 0 },
    { name: '河北', value: 0 },
    { name: '河南', value: 0 },
    { name: '云南', value: 0 },
    { name: '辽宁', value: 0 },
    { name: '黑龙江', value: 0 },
    { name: '湖南', value: 0 },
    { name: '安徽', value: 0 },
    { name: '山东', value: 0 },
    { name: '新疆', value: 0 },
    { name: '江苏', value: 0 },
    { name: '浙江', value: 0 },
    { name: '江西', value: 0 },
    { name: '湖北', value: 0 },
    { name: '广西', value: 0 },
    { name: '甘肃', value: 0 },
    { name: '山西', value: 0 },
    { name: '内蒙古', value: 0 },
    { name: '陕西', value: 0 },
    { name: '吉林', value: 0 },
    { name: '福建', value: 0 },
    { name: '贵州', value: 0 },
    { name: '广东', value: 0 },
    { name: '青海', value: 0 },
    { name: '西藏', value: 0 },
    { name: '四川', value: 0 },
    { name: '宁夏', value: 0 },
    { name: '海南', value: 0 },
    { name: '台湾', value: 0 },
    { name: '香港', value: 0 },
    { name: '澳门', value: 0 },
  ]
  dataList.forEach((item) => {
    const obj = arr.find(
      (it) =>
        it.name.replace(
          /省|回族自治区|吾尔自治区|壮族自治区|特别行政区|自治区/g,
          ''
        ) === item.name
    )
    if (obj) item.value = obj.value
  })
  let option = {
    title: {
      text: '籍贯分布',
      top: '3%'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 位学员',
      borderColor: 'transparent',
      backgroundColor: 'rgba(0,0,0,0.5)',
      textStyle: {
        color: '#fff',
      },
    },
    visualMap: {
      min: 0,
      max: 6,
      left: 'left',
      bottom: '20',
      text: ['6', '0'],
      inRange: {
        color: ['#ffffff', '#0075F0'],
      },
      show: true,
      left: 40,
    },
    geo: {
      map: 'china',
      roam: false,
      zoom: 1.0,
      label: {
        normal: {
          show: true,
          fontSize: '10',
          color: 'rgba(0,0,0,0.7)',
        },
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(0, 0, 0, 0.2)',
          color: '#e0ffff',
        },
        emphasis: {
          areaColor: '#34D39A',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    series: [
      {
        name: '籍贯分布',
        type: 'map',
        geoIndex: 0,
        data: dataList,
      },
    ],
  }
  myChart.setOption(option)
}
