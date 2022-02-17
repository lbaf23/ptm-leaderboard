import axios from "axios";

let authConfig = {
  serverUrl: process.env.REACT_APP_CASDOOR_ENDPOINT,
  clientId: process.env.REACT_APP_CLIENT_ID,
  appName: process.env.REACT_APP_APP_NAME,
  organizationName: process.env.REACT_APP_CASDOOR_ORGANIZATION,
}

const PUBLIC_URL = process.env.PUBLIC_URL

function initAuthWithConfig(config) {
  authConfig = config;
}
function getCasdoorService() {
  return axios.create({
    baseURL: authConfig.serverUrl,
    timeout: 10000,
    withCredentials: true
  })
}

function getUser(teacherId) {
  let request = getCasdoorService()
  return request({
    url: '/api/get-user',
    method: 'get',
    params: {id: authConfig.organizationName + '/' + teacherId}
  })
}

function getAuthorizeUrl() {
  const redirectUri = `${window.location.origin}${PUBLIC_URL}/callback/`;
  const scope = "read";
  const state = authConfig.appName;
  return `${trim(authConfig.serverUrl)}/login/oauth/authorize?client_id=${authConfig.clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
}

function getUserProfileUrl(userName, account) {
  let param = "";
  if (account !== undefined && account !== null) {
    param = `?access_token=${account.accessToken}`;
  }
  return `${trim(authConfig.serverUrl)}/users/${authConfig.organizationName}/${userName}${param}`;
}

function getMyProfileUrl(account) {
  // let param = "";
  //if (account !== undefined && account !== null) {
  //  param = `?access_token=${account.accessToken}`;
  //}
  const t = localStorage.getItem("token")
  return `${trim(authConfig.serverUrl)}/account?access_token=${t}`;
}

function trim(str, ch) {
  if (str === undefined) {
    return undefined;
  }

  let start = 0;
  let end = str.length;

  while (start < end && str[start] === ch)
    ++start;

  while (end > start && str[end - 1] === ch)
    --end;

  return (start > 0 || end < str.length) ? str.substring(start, end) : str;
}


export default {
  getAuthorizeUrl,
  getMyProfileUrl,
  getUser,
  authConfig
}
