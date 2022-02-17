import {casdoorRequest} from './request'
import qs from 'qs'

const AuthBackend = {
  uploadFile(owner, tag, parent, fullFulePath, file, provider="" ) {
    return casdoorRequest({
      url: '/api/upload-resource/',
      method: 'post',
      data: qs.stringify({
        file: file
      }),
      params: {
        owner: owner,
        tag: tag,
        parent: parent,
        fullFulePath: fullFulePath,
        provider: provider
      }
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
