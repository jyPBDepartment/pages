import axios from 'axios'
// import vue from 'vue'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = false

// axios.defaults.timeout = 1000;

// 请求拦截器
axios.interceptors.request.use(
  function(config) {
    //处理登陆验证
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)

// 封装axios的post请求
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export default {
  testAxiosPost(url, params) {
    return fetchPost(url, params)
  },

  testAxiosGet(url, params) {
    return fetchGet(url, params)
  }
}
