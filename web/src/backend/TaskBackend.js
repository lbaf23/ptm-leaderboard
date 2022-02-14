import request from './request'
import qs from 'qs'

const TaskBackend = {
  getTaskList(type) {
    return request({
      url: `/tasklist/${type}/`,
      method: 'get',
    })
  },
  getTask(taskId) {
    return request({
      url: `/task/${taskId}/`,
      method: 'get',
    })
  },
}


export default TaskBackend
