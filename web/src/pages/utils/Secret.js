import JSEncrypt from 'jsencrypt'


function encode(data) {
  let encryptor = new JSEncrypt()
  let pubKey = '-----BEGIN PUBLIC KEY-----\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCzTjzD2HkZsp0vBRDBW5QGsnkS\n' +
    '9rRAO4jWsj9dpm5bz+b2z/neCzB6Y7259yRM9Yw81nXlnPxLNXimGCEikcI/R08t\n' +
    'YcZSuhQ9vBsf4ZD/qHU1lIz58qaSX6Xt4ysRfjcNe9yiigjtd4//UN5+45AiZ69S\n' +
    'YxrT4cP5NuacSl9dfwIDAQAB\n' +
    '-----END PUBLIC KEY-----'
  encryptor.setPublicKey(pubKey)
  return encryptor.encrypt(data)
}

export default {
  encode
}
