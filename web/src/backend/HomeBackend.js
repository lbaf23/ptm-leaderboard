import {apiRequest} from './request'
import qs from 'qs'

const HomeBackend = {
  getHomeContent() {
    return apiRequest({
      url: `/home/`,
      method: 'get',
    })
  },
  updateHomeContent(content) {
    return apiRequest({
      url: `/home/`,
      method: 'post',
      data: qs.stringify({content: content})
    })
  }
}

export default HomeBackend
