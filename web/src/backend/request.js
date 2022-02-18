import axios from 'axios'
import {message} from 'antd'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL
const REACT_APP_ATTACK_URL = process.env.REACT_APP_ATTACK_URL
const REACT_APP_CASDOOR_ENDPOINT = process.env.REACT_APP_CASDOOR_ENDPOINT

export const apiRequest = axios.create({
  baseURL: REACT_APP_BASE_URL,
  timeout: 10000,
})

export const casdoorRequest = axios.create({
  baseURL: REACT_APP_CASDOOR_ENDPOINT,
  timeout: 10000,
  withCredentials: true
})

apiRequest.interceptors.response.use(res=>authMiddleware(res))

function authMiddleware(res) {
  if (res.data.code === 401) {
    message.error(res.data.message);
  } else if (res.data.code === 403) {
    message.error(res.data.message);
  } else {
    res.headers["Access-Control-Allow-Origin"] =  "*"
    return res
  }
}
