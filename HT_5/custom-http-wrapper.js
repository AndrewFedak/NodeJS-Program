const http = require('http');

class HttpServer {
    routes = [];
    listen(port) {
        const server = http.createServer((req, res) => {
            this.prepareRes(res)
            try {
                const routeHandler = this.getRouteHandler(req.method, req.url)

                routeHandler.callback(req, res)
            } catch (e) {
                res.status(500).send(e.message);;
            }
        });

        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
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
    get(path, callback) {
        this.saveRouteHandler('GET', path, callback)
    }
    post(path, callback) {
        this.saveRouteHandler('POST', path, callback)
    }
    put(path, callback) {
        this.saveRouteHandler('PUT', path, callback)
    }
    delete(path, callback) {
        this.saveRouteHandler('DELETE', path, callback)
    }
    saveRouteHandler(method, path, callback) {
        this.routes.push({
            path,
            method,
            callback: function bodyParser(req, res) {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk;
                });
                req.on('end', () => {
                    req.body = JSON.parse(body)
                    callback(req, res)
                });
            },
        })
    }
    getRouteHandler(method, path) {
        return this.routes.find((route) => {
            return route.method === method && route.path === path
        })
    }
}

module.exports = {
    HttpServer
}