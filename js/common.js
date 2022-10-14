// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})

// 每个页面都会导入该js 统一的设置写这里即可
/**
 * 作用:在当前页面出现一个提示消息,过一会自己就会消失
 * @param {提示的文本} msg
 */

function tip(msg) {
  const myToast = new bootstrap.Toast(document.querySelector('#myToast'), {
    delay: 1000,
  })
  document.querySelector('#myToast .toast-body').innerHTML = msg
  myToast.show()
}

// 配置ajax基地址
axios.defaults.baseURL = 'http://ajax-api.itheima.net'

// 添加请求拦截器
const myInterceptor = axios.interceptors.request.use(
  function (config) {
    // 每次都发送请求头
    config.headers.Authorization = JSON.parse(
      sessionStorage.getItem('information')
    ).token
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    // token失效清除数据并退出登录
    if (error.response.status === 401) {
      sessionStorage.removeItem('information')
      location.href = './login.html'
    }
    return Promise.reject(error)
  }
)

// 退出登录功能与渲染用户名
const logout = document.getElementById('logout')
if (logout)
  logout.addEventListener('click', () => {
    sessionStorage.removeItem('information')
    location.href = './login.html'
  })
const username = document.querySelector('.mb-0.text-sm.font-weight-bold')
if (username) {
  username.innerHTML = JSON.parse(
    sessionStorage.getItem('information')
  ).username
}
