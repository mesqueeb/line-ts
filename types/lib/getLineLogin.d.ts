/**
 * https://developers.line.biz/en/docs/line-login/integrate-line-login/#making-an-authorization-request
 */
export declare type LineLoginUrlParams = {
    /**
     * (Optional - default 'code') code. This tells the LINE Platform to return an authorization code.
     */
    response_type?: string;
    /**
     * (Required) Channel ID. Unique identifier for your channel issued by LINE.
     */
    client_id: string;
    /**
     * (Required) Callback URL. URL that users are redirected to after authentication and authorization. Must match one of the the callback URLs registered for your channel in the console.
     */
    redirect_uri: string;
    /**
     * (Optional - default to a random string) A unique alphanumeric string used to prevent cross-site request forgery. This value should be randomly generated by your application. Cannot be a URL-encoded string.
     */
    state?: string;
    /**
     * (Optional - default 'openid') Permissions requested to the user. For more information, see scopes.
     * To obtain the email address of a user, you must first apply for permission.
     * An access token with the profile scope is required to get the friendship status between a user and a LINE Official Account.
     */
    scope?: 'profile' | 'profile%20openid' | 'profile%20openid%20email' | 'openid' | 'openid%20email';
    /**
     * (Optional) A string used to prevent replay attacks. This value is returned in an ID token.
     */
    nonce?: string;
    /**
     * (Optional) consent. Used to force the consent screen to be displayed even if the user has already granted all requested permissions.
     */
    prompt?: string;
    /**
     * (Optional) The allowable elapsed time in seconds since the last time the user was authenticated. Corresponds to the max_age parameter defined in the "Authentication Request" section of OpenID Connect Core 1.0.
     */
    max_age?: number;
    /**
     * (Optional) Display language for LINE Login screens. Specify as one or more RFC 5646 (BCP 47) language tags, separated by spaces, in order of preference. Corresponds to the ui_locales parameter defined in the "Authentication Request" section of OpenID Connect Core 1.0.
     */
    ui_locales?: string;
    /**
     * (Optional) Displays an option to add a LINE Official Account as a friend during login. Set to either normal or aggressive. For more information, see Add a LINE Official Account as a friend when logged in (bot link).
     */
    bot_prompt?: string;
};
/**
 * Get a URL that users can access to login with LINE and be redirected to your app again.
 *
 * Further documentation: https://developers.line.biz/en/docs/line-login/integrate-line-login/#making-an-authorization-request
 *
 * @param {LineLoginUrlParams} params Only client_id & redirect_uri are required props.
 * @returns {string} the `https://access.line.me/oauth2/v2.1/authorize${query}` URL with correct query
 */
export declare function getLineLoginUrl(params: LineLoginUrlParams): string;
