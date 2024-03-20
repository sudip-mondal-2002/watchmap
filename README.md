# watchmap

## Problem Statement
Microservices are used in a variety of products, across sectors, and cloud platforms try hard to provide observability services to cater developer needs. A standalone dev tool is needed which can track services across a backend and makes it easy to visualise the dependencies of services across the high level architecture of software product. The tool should allow simulation of the system if a service fails or undergoes downtime. The solution should run independent of the development environment (eg spring, django, node, or services running in docker), and with minimal setup required. Since REST is widely used, the dev tool shall map all the services based on API routes connecting services. Potentially improvise and work for newer protocols such as gRPC.

Watchmap: A simple service to map microservices and API endpoints to create a dependency graph. Simulate how the system reacts to service faults using a dashboard.

## Brief
Watchmap can map different services into a dependency graph, and list all the endpoints that are exposed outside the architecture as well as all internal API endpoints across services in the architecture. 
The tool gives a dashboard which is initialised(currently using postmap) to read services and endpoints.
Dashboard presents the dependency graph of the services and lists all API.
Developers can test how shutting down a service affects other services and API endpoints, allowing simulation for fault tolerance within the system.
This works dynamically as backend architecture is being developed, so enhances decision making of the dev team.

## Platform Independent Advantages
This tool is platform independent as it relies on connection of services through API endpoints.
Works even if all services run inside isolated containers (docker/podman etc.)
Services can run using any framework of choice (spring boot/django/flask/express/ or a mix of these).
Services run in the cloud (can be mapped even if running with k8s services).
Can be integrated in Cloud Services (_Potentially a product for Cloudbees_).

## Tech Stack Used
The devtool is built in typescript on nodejs with the next framework.
The SDK currently support Express Js and Django frameworks. It is easy to extend other frameworks like spring boot, fastapi, flask using annotations/middleware.




A simple service to map microservices and API endpoints to create a dependency graph. Built over Express.js and utilizes express middlewares/request API.

## The High Level Design

1. Middleware (implimented as an sdk) acts as live watcher for the incoming request to an API of a particular microservice from the concerned macroservice.
2. The watchmap server runs as a next.js application which recieves anlytics logs from middleware to process the API dependency graph.
3. The analytics dashboard and watchmap server make up as next app, the analytics dashboard provide visual presentation of API dependency graph.

### Algorithm to track dependency graph
To track the API requests, the developer installs watchmap as sdk (currently django and express) and adds it to the middleware for endpoints exposed to watch for this service. 
The service emits an service invoked event to report it is invoked.
This service then emits a request complete event after returning response.
The order of events resolves a graph (not necessary acyclic).
Service invoked event creates a node and is added to a stack, recursively adding more nodes. On the Request complete event, the topmost node in stack is connected to the previous node from which request was sent to this node.

## How to use

### Expressjs SDK
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

### Django SDK
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

`check the docker-compose file to understand the usage in a microservice`

## monitor snapshots
![image](https://github.com/cyboholics/watchmap/assets/74463091/e57ff653-f69f-422f-949e-220d434bb84f)
![image](https://github.com/cyboholics/watchmap/assets/74463091/6114ce17-bf15-4daa-b1ec-d24458fee291)


