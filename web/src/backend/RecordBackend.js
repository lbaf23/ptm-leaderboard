import {apiRequest} from './request'

const RecordBackend = {
  getRecordList(taskId, page, pageSize, orderBy, orderType) {
    return apiRequest({
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
    return apiRequest({
      url: `/record/${id}/`,
      method: 'get',
      params: {
        token: localStorage.getItem("token")
      }
    })
  }
}

export default RecordBackend
