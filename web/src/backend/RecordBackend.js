import request from './request'
import qs from 'qs'

const RecordBackend = {
  getRecordList(taskId, page, pageSize) {
    return request({
      url: `/recordlist/`,
      method: 'get',
      params: {
          taskId: taskId,
          page: page,
          pageSize: pageSize
      }
    })
  }
}


export default RecordBackend
