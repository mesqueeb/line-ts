# LINE TS

```
npm i line-ts
```

LINE TypeScript SDK.

## Node & Browser helper functions for LINE

### Browser & Node

Functions:

- [getLineLoginUrl](https://github.com/mesqueeb/line-ts/blob/production/src/lib/getLineLoginUrl.ts)

<!-- prettier-ignore-start -->
```js
import { getLineLoginUrl } from 'line-ts'

const payload = { client_id, redirect_uri }
// redirect_uri can include 'https://' and it will be formatted to LINE's requirements

const result = getLineLoginUrl(payload)

// LINE login URL with correct query
// result looks like:
`https://access.line.me/oauth2/v2.1/authorize${query}`
```
<!-- prettier-ignore-end -->

- [getParamsFromLoginCallback](https://github.com/mesqueeb/line-ts/blob/production/src/lib/getParamsFromLoginCallback.ts)

<!-- prettier-ignore-start -->
```js
import { getParamsFromLoginCallback } from 'line-ts'

const payload = callbackUrlTriggered
// eg. https://client.example.org/cb?code=abcd1234&state=0987

const result = getParamsFromLoginCallback(payload)

// result looks like:
{ code: 'abcd1234', state: '0987' }
```
<!-- prettier-ignore-end -->

For more information, click on the function links where you can see further documentation & types.

### Node only

> Please note that the Node only helpers cannot be used in a browser environment!

Node helpers use [GOT](https://github.com/sindresorhus/got) as dependency to make requests.

Functions:

- [issueAccessToken](https://github.com/mesqueeb/line-ts/blob/production/src/libNode/issueAccessToken.ts)

<!-- prettier-ignore-start -->
```js
import { issueAccessToken } from 'line-ts'

const payload = { code, redirect_uri, client_id, client_secret }
const result = await issueAccessToken(payload)

// result looks like:
{ access_token, expires_in, id_token, refresh_token, scope, token_type }
```
<!-- prettier-ignore-end -->

- [decodeIdToken](https://github.com/mesqueeb/line-ts/blob/production/src/libNode/decodeIdToken.ts)

<!-- prettier-ignore-start -->
```js
import { decodeIdToken } from 'line-ts'

const payload = `line.id.token`
const result = await decodeIdToken(payload)

// result looks like:
{ header, payload, signature }
// you can retrieve information from the payload:
//   sub is the user id
{ sub, name, picture, email } = payload
```
<!-- prettier-ignore-end -->

For more information, click on the function links where you can see further documentation & types.
