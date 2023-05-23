function randomString(length = 20) {
  return Array(length).fill(0).map(() => Math.random().toString(36).charAt(2)).join("");
}

function getLineLoginUrl(params) {
  const {
    response_type = "code",
    state = randomString(),
    scope = "openid",
    redirect_uri: _redirect_uri
  } = params;
  const redirect_uri = _redirect_uri.replace(/:/g, "%3A").replace(/\//g, "%2F");
  const paramsObject = { ...params, response_type, redirect_uri, state, scope };
  const query = Object.entries(paramsObject).map((entry) => entry.join("=")).join("&");
  return `https://access.line.me/oauth2/v2.1/authorize?${query}`;
}

function getParamsFromLoginCallback(callbackUrlTriggered) {
  const query = callbackUrlTriggered.split("?")[1];
  const queryEntries = query.split("&").map((q) => q.split("="));
  const queryObject = Object.fromEntries(queryEntries);
  return queryObject;
}

export { getLineLoginUrl, getParamsFromLoginCallback };
