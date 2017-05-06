'use strict'
require('dotenv').config()
const routes = require("./src/routes")
const Hapi = require('hapi')
const server = new Hapi.Server()
const hapi_server_port = process.env.HAPI_SERVER_PORT
console.log('Initiating server start in port ' + hapi_server_port)

server.connection({ port: hapi_server_port })
server.route(routes)
server.start((err) => {
    if (err) {
        console.log('Process aborted. Error occurred while running the server in port ' + hapi_server_port)
        throw err
    }
    console.log('Server running in port ' + hapi_server_port)
})

server.on('response', function(request) {
    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode)
})

module.exports = server