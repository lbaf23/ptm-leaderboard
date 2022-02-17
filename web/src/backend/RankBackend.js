import {request} from './request'
import qs from 'qs'

const RankBackend = {
  getRankList(taskId, page, pageSize) {
    return request({
      url: `/ranklist/`,
      method: 'get',
      params: {
        taskId: taskId,
        page: page,
        pageSize: pageSize
      }
    })
  }
}

export default RankBackend
