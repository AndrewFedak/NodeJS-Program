const http = require('http');
const url = require('url');

class HttpServer {
    routes = [];

    listen(port, callback) {
        const server = http.createServer((req, res) => {
            try {
                this.prepareRes(res)

                const { pathname, query } = url.parse(req.url, true);
                
                const routeHandler = this.getRouteHandler({ method: req.method, route: pathname })

                req.query = query
                req.params = this.retrieveParamsFromRouteReq(pathname, routeHandler.route)

                routeHandler.callback(req, res)
            } catch (e) {
                res.status(500).send(e.message);;
            }
        });

        server.listen(port, callback);
    }
    prepareRes(res) {
        res.status = function (statusCode) {
            res.statusCode = statusCode;
            return res
        }
        res.json = function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        }
        res.send = function (data) {
            res.setHeader('Content-Type', 'text/plain');
            res.end(data);
        }
    }
    get(route, callback) {
        this.saveRouteHandler('GET', route, callback)
    }
    post(route, callback) {
        this.saveRouteHandler('POST', route, callback)
    }
    update(route, callback) {
        this.saveRouteHandler('UPDATE', route, callback)
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
                    req.body = body && JSON.parse(body)
                    callback(req, res)
                });
            },
        })
    }
    getRouteHandler({ method, route }) {
        const routeHandler = this.routes.find((routeHandler) => {
            return routeHandler.method === method && this.matchRoute(route, routeHandler.route)
        })

        if (!routeHandler) {
            throw new Error('Route not found')
        }

        return routeHandler
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

module.exports = {
    HttpServer
}