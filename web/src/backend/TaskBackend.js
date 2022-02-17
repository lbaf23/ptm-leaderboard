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
  updateTaskContent(taskId, content) {
    return request({
      url: `/task/${taskId}/`,
      method: 'post',
      data: qs.stringify({content: content})
    })
  }
}


export default TaskBackend
