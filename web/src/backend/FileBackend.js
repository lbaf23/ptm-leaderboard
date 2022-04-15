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
}

export default FileBackend
