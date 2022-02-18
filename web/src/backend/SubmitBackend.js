import {attackRequest} from "./request";
import qs from "qs";

const SubmitBackend = {
  submitModel(modelName, fileUrl) {
    return attackRequest({
      url: `/`,
      method: "post",
      data: qs.stringify({
        modelName: modelName,
        fileUrl: fileUrl,
      }),
      params: {
        token: localStorage.getItem("token")
      }
    })
  }
}
