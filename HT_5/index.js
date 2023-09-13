const { HttpServer } = require('./custom-http-wrapper')

const app = new HttpServer()

app.get('/hello-world', (req, res) => {
    res.status(201).json(req.body)
})

app.listen(3000)