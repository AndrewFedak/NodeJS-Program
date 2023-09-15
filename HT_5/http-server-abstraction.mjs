import http from 'node:http'
import url from 'node:url'

import { exceptionFilter } from './src/exceptions/exception-filter.mjs';

export class HttpServer {
    routes = [];

    listen(port, callback) {
        const server = http.createServer(async (req, res) => {
            this.prepareRes(res)

            const { pathname, query } = url.parse(req.url, true);

            const routeHandler = this.getRouteHandler({ method: req.method, route: pathname })
            if (!routeHandler) {
                return res.status(404).send('Route not found')
            }

            req.query = query
            req.params = this.retrieveParamsFromRouteReq(pathname, routeHandler.route)

            routeHandler.callback(req, res)
        });

        server.listen(port, callback);
    }
    prepareRes(res) {
        res.status = function (statusCode) {
            res.statusCode = statusCode;
            return res
        }
        res.cache = function ({ maxAge }) {
            return res.setHeader('Cache-Control', `max-age=${maxAge}`);
        }
        res.json = function (data) {
            const resData = JSON.stringify({ data })
            res.setHeader('Content-Type', 'application/json').end(resData);
        }
        res.sendError = function (error) {
            const errData = JSON.stringify({ error })
            res.setHeader('Content-Type', 'application/json').end(errData);
        }
        res.send = function (data) {
            res.setHeader('Content-Type', 'text/plain').end(data);
        }
    }
    get(route, callback) {
        this.saveRouteHandler('GET', route, callback)
    }
    post(route, callback) {
        this.saveRouteHandler('POST', route, callback)
    }
    patch(route, callback) {
        this.saveRouteHandler('PATCH', route, callback)
    }
    delete(route, callback) {
        this.saveRouteHandler('DELETE', route, callback)
    }
    saveRouteHandler(method, route, callback) {
        this.routes.push({
            method,
            route,
            callback: function bodyParser(req, res) {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk;
                });
                req.on('end', () => {
                    try {
                        req.body = body && JSON.parse(body)
                        callback(req, res)
                    } catch (err) {
                        exceptionFilter(err, res)
                    }
                });
            },
        })
    }
    getRouteHandler({ method, route }) {
        return this.routes.find((routeHandler) => {
            return routeHandler.method === method && this.matchRoute(route, routeHandler.route)
        })
    }
    matchRoute(reqRoute, savedRoute) {
        const reqNestedRoutes = this.routeToNestedRoutes(reqRoute)
        const savedNestedRoutes = this.routeToNestedRoutes(savedRoute)

        const isLevelOfRouteNestingDiffer = reqNestedRoutes.length !== savedNestedRoutes.length
        if (isLevelOfRouteNestingDiffer) {
            return false
        }

        for (let level = 0; level < reqNestedRoutes.length; level++) {
            const savedNestRoute = savedNestedRoutes[level]
            const reqNestRoute = reqNestedRoutes[level]
            if (this.isNestedRouteParam(savedNestRoute)) {
                continue
            }
            if (reqNestRoute !== savedNestRoute) {
                return false
            }
        }
        return true
    }
    retrieveParamsFromRouteReq(reqRoute, savedRoute) {
        const paramsMap = new Map()
        const reqNestedRoutes = this.routeToNestedRoutes(reqRoute)
        const savedNestedRoutes = this.routeToNestedRoutes(savedRoute)

        for (let level = 0; level < reqNestedRoutes.length; level++) {
            const savedNestRoute = savedNestedRoutes[level]
            const reqNestRoute = reqNestedRoutes[level]
            if (this.isNestedRouteParam(savedNestRoute)) {
                const paramName = this.getParamNameFromNestedRoute(savedNestRoute)
                paramsMap.set(paramName, reqNestRoute)
            }
        }

        return Object.fromEntries(paramsMap.entries())
    }
    routeToNestedRoutes(route) {
        return route.split('/')
    }
    isNestedRouteParam(nestedRoute) {
        return nestedRoute.indexOf(':') === 0
    }
    getParamNameFromNestedRoute(nestedRoute) {
        return nestedRoute.replace(':', '')
    }
}