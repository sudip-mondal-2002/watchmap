# watchmap
A simple service to map microservices and API endpoints to create a dependency graph. Built over Express.js and utilizes express middlewares/request API.

The High Level Design

1. Middleware (implimented as an sdk) acts as live watcher for the incoming request to an API of a particular microservice from the concerned macroservice.
2. The watchmap server runs as a next.js application which recieves anlytics logs from middleware to process the API dependency graph.
3. The analytics dashboard and watchmap server make up as next app, the analytics dashboard provide visual presentation of API dependency graph.

## Expressjs SDK

In your server, add these lines
```sh
$ npm i @cyboholics/watchmap-js-sdk
```
```ts
import express from 'express';
import watchmap from '@cyboholics/watchmap-js-sdk';
...
const app = express();
app.use(await watchmap())
...
```

## Django SDK
```sh
$ pip install watchmap-django-sdk
```
```py
MIDDLEWARE = [
     ...
    'watchmap-django-sdk.watchmap_sdk.WatchmapMiddleware'
     ...
]
```
## monitor snapshots
![image](https://github.com/cyboholics/watchmap/assets/74463091/e57ff653-f69f-422f-949e-220d434bb84f)
![image](https://github.com/cyboholics/watchmap/assets/74463091/6114ce17-bf15-4daa-b1ec-d24458fee291)


