import {casdoorRequest} from './request'
import qs from 'qs'
import app from "../App";

const AuthBackend = {
  getUser() {
    return casdoorRequest({
      url: '/api/get-user?id=ptm-leaderboard/user1',
      method: 'get',
    })
  },
  uploadFile(owner, user, application, tag, parent, fullFilePath, file, provider="" ) {
    const formData = new FormData();
    formData.append("file", file)
    return casdoorRequest({
      url: '/api/upload-resource',
      method: 'post',
      params: {
        owner: owner,
        user: user,
        application: application,
        tag: tag,
        parent: "admin",
        fullFilePath: fullFilePath,
        provider: provider,
      },
      data: formData,
      withCredentials: true
    })
  },
  deleteFile(data, provider="") {
    return casdoorRequest({
      url: `/api/delete-resource/`,
      method: 'post',
      data: data,
      params: {
        provider: provider
      }
    })
  }
}


export default AuthBackend
