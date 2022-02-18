import {apiRequest} from './request'
import qs from 'qs'

const AuthBackend = {
  login(code, state) {
    return apiRequest({
      url: '/auth/login/',
      method: 'post',
      data: qs.stringify({code: code, state: state}),
    })
  },
  logout() {
    return apiRequest({
      url: '/auth/logout/',
      method: 'post',
    })
  },
  getAccount() {
    return apiRequest({
      url: '/auth/account/',
      method: 'get',
      params: {
        token: localStorage.getItem("token")
      }
    })
  }
}

export default AuthBackend
