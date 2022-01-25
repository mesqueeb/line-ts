'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Generates a non-safe random string which can have duplicates around 7 million generations.
 */
function randomString(length = 20) {
    return Array(length)
        .fill(0)
        .map(() => Math.random().toString(36).charAt(2))
        .join('');
}

/**
 * Get a URL that users can access to login with LINE and be redirected to your app again.
 *
 * LINE documentation: https://developers.line.biz/en/docs/line-login/integrate-line-login/#making-an-authorization-request
 *
 * @param {LineLoginUrlParams} params Only client_id & redirect_uri are required props.
 * @returns {string} the `https://access.line.me/oauth2/v2.1/authorize${query}` URL with correct query
 */
function getLineLoginUrl(params) {
    const { response_type = 'code', state = randomString(), scope = 'openid', redirect_uri: _redirect_uri, } = params;
    const redirect_uri = _redirect_uri.replace(/:/g, '%3A').replace(/\//g, '%2F');
    const paramsObject = { ...params, response_type, redirect_uri, state, scope };
    const query = Object.entries(paramsObject)
        .map((entry) => entry.join('='))
        .join('&');
    return `https://access.line.me/oauth2/v2.1/authorize?${query}`;
}

/**
 * Once the user is authenticated and authorization is complete, the HTTP status code 302 and query parameters are returned in the callback URL. This function converts the callback URL to an object with the query parameters.
 *
 * @param {string} callbackUrlTriggered eg. https://client.example.org/cb?code=abcd1234&state=0987poi&friendship_status_changed=true
 * @returns {LoginCallbackParamsSuccess | LoginCallbackParamsError}
 * @example // Success example:
HTTP/1.1 302 Found
Location: https://client.example.org/cb?code=abcd1234&state=0987poi&friendship_status_changed=true
 * @example // Error example:
Location: https://example.com/callback?error=access_denied&error_description=The+resource+owner+denied+the+request.&state=0987poi
 */
function getParamsFromLoginCallback(callbackUrlTriggered) {
    const query = callbackUrlTriggered.split('?')[1];
    const queryEntries = query.split('&').map((q) => q.split('='));
    const queryObject = Object.fromEntries(queryEntries);
    return queryObject;
}

exports.getLineLoginUrl = getLineLoginUrl;
exports.getParamsFromLoginCallback = getParamsFromLoginCallback;
