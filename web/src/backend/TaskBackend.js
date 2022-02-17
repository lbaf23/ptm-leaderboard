import {apiRequest} from './request'
import qs from 'qs'

const TaskBackend = {
  getTaskList(type) {
    return apiRequest({
      url: `/tasklist/${type}/`,
      method: 'get',
    })
  },
  getTask(taskId) {
    return apiRequest({
      url: `/task/${taskId}/`,
      method: 'get',
    })
  },
  updateTaskContent(taskId, content) {
    return apiRequest({
      url: `/task/${taskId}/`,
      method: 'post',
      data: qs.stringify({content: content})
    })
  }
}

export default TaskBackend
