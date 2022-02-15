import request from './request'

const DataSetBackend = {
  getTaskDataSets(taskId) {
    return request({
      url: `/dataset/?taskId=${taskId}`,
      method: 'get',
    })
  },
}

export default DataSetBackend
