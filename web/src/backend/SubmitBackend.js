import {apiRequest} from "./request";
import qs from "qs";

const SubmitBackend = {
  submitModel(modelName, fileUrl, taskId, modelBasedOn, mode, hgToken) {
    return apiRequest({
      url: '/submit/',
      method: 'post',
      data: qs.stringify({
        modelName: modelName,
        fileUrl: fileUrl,
        taskId: taskId,
        modelBasedOn: modelBasedOn,
        mode: mode,
        hgToken: hgToken,
      }),
      params: {
        token: localStorage.getItem("token")
      }
    })
  }
}

export default SubmitBackend
