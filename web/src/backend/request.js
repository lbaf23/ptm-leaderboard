import axios from 'axios'
import {message} from 'antd'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

function getServerUrl() {
  return REACT_APP_BASE_URL
}

export const request = axios.create({
  baseURL: getServerUrl(),
  timeout: 10000,
  withCredentials: true,
})

export const casdoorRequest = axios.create({
  baseURL: process.env.REACT_APP_CASDOOR_ENDPOINT,
  timeout: 10000,
  withCredentials: true
})

request.interceptors.response.use(res=>{
  if (res.data.code === 401) {
    message.error(res.data.message);
  } else if (res.data.code === 403) {
    message.error(res.data.message);
  } else {
    res.headers["Access-Control-Allow-Origin"] =  "*"
    return res
  }
})
