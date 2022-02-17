import {request} from './request'
import qs from 'qs'

const RecordBackend = {
  getRecordList(taskId, page, pageSize, orderBy, orderType) {
    return request({
      url: `/recordlist/`,
      method: 'get',
      params: {
        taskId: taskId,
        page: page,
        pageSize: pageSize,
        orderBy: orderBy,
        orderType: orderType
      }
    })
  },
  getRecord(id) {
    return request({
      url: `/record/${id}/`,
      method: 'get',
    })
  }
}


export default RecordBackend
