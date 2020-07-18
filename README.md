# LINE TS

```
npm i line-ts
```

LINE TypeScript SDK.

## Typescript helper functions for LINE

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

## NodeJS helper functions for LINE

Check [line-node](https://github.com/mesqueeb/line-node) for nodeJS helper functions including:

- issueAccessToken
- decodeIdToken
