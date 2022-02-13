import axios from 'axios'
import {message} from 'antd'

const BASE_URL = process.env.BASE_URL

function getServerUrl() {
  return BASE_URL
}

const request = axios.create({
  baseURL: getServerUrl(),
  timeout: 10000,
  withCredentials: true
})

request.interceptors.response.use(res=>{
  if (res.data.code === 401) {
    message.error(res.data.msg);
  } else if (res.data.code === 403) {
    message.error(res.data.msg);
  } else {
    return res
  }
})

export default request
