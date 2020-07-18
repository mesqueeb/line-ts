# LINE TS

```
npm i line-ts
```

LINE TypeScript SDK.

## Mixed Node & Browser helpers for LINE

### Node only

> Please note that the Node only helpers cannot be used in a browser environment!

Node helpers use [GOT](https://github.com/sindresorhus/got) as dependency to make requests.

Functions:

- [issueAccessToken](https://github.com/mesqueeb/line-ts/blob/production/src/libNode/issueAccessToken.ts)

### Browser & Node

Functions:

- [getLineLoginUrl](https://github.com/mesqueeb/line-ts/blob/production/src/lib/getLineLoginUrl.ts)
- [getParamsFromLoginCallback](https://github.com/mesqueeb/line-ts/blob/production/src/lib/getParamsFromLoginCallback.ts)
