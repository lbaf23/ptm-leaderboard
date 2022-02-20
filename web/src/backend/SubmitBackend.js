import {apiRequest} from "./request";
import qs from "qs";

const SubmitBackend = {
  submitModel(modelName, fileUrl, taskId) {
    return apiRequest({
      url: '/submit/',
      method: 'post',
      data: qs.stringify({
        modelName: modelName,
        fileUrl: fileUrl,
        taskId: taskId
      }),
      params: {
        token: localStorage.getItem("token")
      }
    })
  }
}

export default SubmitBackend
