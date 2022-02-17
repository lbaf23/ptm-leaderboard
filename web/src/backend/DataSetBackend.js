import {apiRequest} from './request'

const DataSetBackend = {
  getTaskDataSets(taskId) {
    return apiRequest({
      url: `/dataset/?taskId=${taskId}`,
      method: 'get',
    })
  },
}

export default DataSetBackend
