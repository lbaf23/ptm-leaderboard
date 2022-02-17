import axios from 'axios'
import {message} from 'antd'

import auth from '../pages/Auth/Auth'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

function getServerUrl() {
  return REACT_APP_BASE_URL
}

export const request = axios.create({
  baseURL: getServerUrl(),
  timeout: 10000,
  withCredentials: true
})

export const casdoorRequest = axios.create({
  baseURL: auth.authConfig.serverUrl,
  timeout: 10000,
  withCredentials: true
})


request.interceptors.response.use(res=>{
  if (res.data.code === 401) {
    message.error(res.data.message);
  } else if (res.data.code === 403) {
    message.error(res.data.message);
  } else {
    return res
  }
})
