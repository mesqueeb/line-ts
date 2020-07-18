import { randomString } from "./helpers/randomString"
import { LineAuthUrlParams } from "./types"

/**
 * Get a link that users can be accessed to login with LINE.
 * https://developers.line.biz/en/docs/line-login/integrate-line-login/#making-an-authorization-request
 */
export const getLineLoginUrl = (params: LineAuthUrlParams) => {
	const {
		response_type = 'code',
		state = randomString(),
		scope = 'openid',
		redirect_uri: _redirect_uri,
	} = params
	const redirect_uri =  _redirect_uri.replace(/:/g, '%3A').replace(/\//g, '%2F')
  const paramsObject = { ...params, response_type, redirect_uri, state, scope }
  const query = Object.entries(paramsObject)
    .map(entry => entry.join('='))
    .join('&')
  return `https://access.line.me/oauth2/v2.1/authorize?${query}`
}
