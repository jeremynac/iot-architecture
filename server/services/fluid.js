var express = require('express');
const coap = require('coap')
const server = coap.createServer({})


// the default CoAP port is 5683
const sendCoapRequestToThingsboard = async (type, consumedVolume, totalVolume, thingsboardAccessToken) => {
    try {
    // server.on('request', (req, res) => {
    //     res.end('Hello ' + req.url.split('/')[1] + '\n')
    //   })
    // server.listen(1234,  () => {
        const req = coap.request({host: '127.0.0.1', pathname: `/api/v1/${thingsboardAccessToken}/telemetry`, method: 'post'})
        console.log(thingsboardAccessToken)
        const payload = {
            type: type,
            consumedVolume: consumedVolume,
            totalVolume: totalVolume,
        }
        req.write(JSON.stringify(payload));
        req.on('response', (res) => {
            // res.pipe(process.stdout)
        })
        req.end()
    // })
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    sendCoapRequestToThingsboard
}