var express = require('express');
var router = express.Router();
const {sendCoapRequestToThingsboard}  = require('../services/fluid')

/* GET home page. */
router.post('/', async function(req, res, next) {
  const body = req.body
  const { type, consumedVolume, totalVolume, capacity, totalConsumption, longitude, latitude, thingsboardAccessToken } = body;
  console.log("Ok")
  await sendCoapRequestToThingsboard(type, consumedVolume, totalVolume, capacity, totalConsumption, longitude, latitude, thingsboardAccessToken);
  res.send("Ok")
});

module.exports = router;
