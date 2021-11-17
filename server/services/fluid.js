var express = require('express');
const coap = require('coap')
const server = coap.createServer({})


// the default CoAP port is 5683
const sendCoapRequestToThingsboard = async (type, consumedVolume, totalVolume, capacity, totalConsumption, thingsboardAccessToken) => {
    try {
        console.log("Okservice")
        const req = coap.request({host: '127.0.0.1', pathname: `/api/v1/${thingsboardAccessToken}/telemetry`, method: 'post'})
        const payload = {
            type: type,
            consumedVolume: consumedVolume,
            totalVolume: totalVolume,
            capacity: capacity,
            totalConsumption: totalConsumption,
        }
        req.write(JSON.stringify(payload));
        req.on('response', (res) => {
            console.log(res.payload)
        })
        req.end()
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    sendCoapRequestToThingsboard
}