
export let authConfig = {
  serverUrl: process.env.REACT_APP_CASDOOR_ENDPOINT,
  clientId: process.env.REACT_APP_CLIENT_ID,
  appName: process.env.REACT_APP_APP_NAME,
  organizationName: process.env.REACT_APP_CASDOOR_ORGANIZATION,
  redirectPath: `${process.env.PUBLIC_URL}/callback`,
}

const PUBLIC_URL = process.env.PUBLIC_URL

export function getAuthorizeUrl() {
  const redirectUri = `${window.location.origin}${PUBLIC_URL}/callback/`;
  const scope = "read";
  const state = authConfig.appName;
  return `${authConfig.serverUrl}/login/oauth/authorize?client_id=${authConfig.clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
}

export function getUserProfileUrl(userName, account) {
  let param = "";
  if (account !== undefined && account !== null) {
    param = `?access_token=${account.accessToken}`;
  }
  return `${authConfig.serverUrl}/users/${authConfig.organizationName}/${userName}${param}`;
}

export function getMyProfileUrl() {
  const t = localStorage.getItem("token")
  return `${authConfig.serverUrl}/account?access_token=${t}`;
}
