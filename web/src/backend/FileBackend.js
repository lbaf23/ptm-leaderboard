import {fileRequest} from './request'
import qs from "qs";

const FileBackend = {
  uploadFile(data) {
    return fileRequest({
      url: '/file/',
      method: 'post',
      data: data,
      withCredentials: true
    })
  },
  getSTS() {
    return fileRequest({
      url: '/oss/sts/',
      method: 'get',
      params: {
        token: localStorage.getItem("token")
      }
    })
  }
}

export default FileBackend
