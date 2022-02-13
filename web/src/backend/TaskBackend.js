import request from './request'
import qs from 'qs'

const TaskBackend = {
  getTaskList() {
    return request({
      url: '/tasklist',
      method: 'get',
    })
  },
  getTask(taskId) {
    return request({
      url: `/task/${taskId}`,
      method: 'get',
    })
  },
}


export default TaskBackend
