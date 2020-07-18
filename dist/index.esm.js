import got from 'got';

/**
 * Generates a non-safe random string which can have duplicates around 7 million generations.
 */
function randomString(length = 20) {
    return Array(length).fill(0).map(() => Math.random().toString(36).charAt(2)).join('');
}

/**
 * (Browser & Node) Get a URL that users can be accessed to login with LINE.
 * https://developers.line.biz/en/docs/line-login/integrate-line-login/#making-an-authorization-request
 * @returns {string} the `https://access.line.me/oauth2/v2.1/authorize${query}` URL with correct query
 */
function getLineLoginUrl(params) {
    const { response_type = 'code', state = randomString(), scope = 'openid', redirect_uri: _redirect_uri, } = params;
    const redirect_uri = _redirect_uri.replace(/:/g, '%3A').replace(/\//g, '%2F');
    const paramsObject = Object.assign(Object.assign({}, params), { response_type, redirect_uri, state, scope });
    const query = Object.entries(paramsObject)
        .map(entry => entry.join('='))
        .join('&');
    return `https://access.line.me/oauth2/v2.1/authorize?${query}`;
}

/**
 * Once the user is authenticated and authorization is complete, the HTTP status code 302 and the following query parameters are returned in the callback URL.
 * @returns {LoginCallbackParamsSuccess | LoginCallbackParamsError}
 * @example // Success example:
HTTP/1.1 302 Found
Location: https://client.example.org/cb?code=abcd1234&state=0987poi&friendship_status_changed=true
 * @example // Error example:
Location: https://example.com/callback?error=access_denied&error_description=The+resource+owner+denied+the+request.&state=0987poi
 */
function getParamsFromLoginCallback(callbackUrlTriggered) {
    const query = callbackUrlTriggered.split('?')[1];
    const queryEntries = query.split('&').map(q => q.split('='));
    const queryObject = Object.fromEntries(queryEntries);
    return queryObject;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 * Makes a POST request to retrieve an access token from LINE. This uses GOT as a dependency to make the request.
 * Can throw errors.
 * @param {IssueAccessTokenParams} params
 * @returns {Promise<IssueAccessTokenResponse>}
 */
function issueAccessToken(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { grant_type = 'authorization_code', code, redirect_uri, client_id, client_secret, } = params;
        if (!code || !redirect_uri || !client_id || !client_secret) {
            throw new Error('Missing information in params');
        }
        /**
         * To get an access token, make an HTTP POST request with the authorization code. Once you have an access token, you can use it to make API calls. The access token is issued at the following endpoint.
         * The information in the request body should be:
         * Content-Type: application/x-www-form-urlencoded
         */
        const form = { grant_type, code, redirect_uri, client_id, client_secret };
        const { body } = yield got
            .post('https://api.line.me/oauth2/v2.1/token', { form, responseType: 'json' });
        const response = body.data;
        return response;
    });
}

export { getLineLoginUrl, getParamsFromLoginCallback, issueAccessToken };
