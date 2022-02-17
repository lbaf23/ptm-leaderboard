import {request} from './request'

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
        orderType: orderType,
        token: localStorage.getItem("token")
      }
    })
  },
  getRecord(id) {
    return request({
      url: `/record/${id}/`,
      method: 'get',
      params: {
        token: localStorage.getItem("token")
      }
    })
  }
}

export default RecordBackend
