var express = require('express');
var router = express.Router();
const {sendCoapRequestToThingsboard}  = require('../services/fluid')

/* GET home page. */
router.post('/', function(req, res, next) {
  const body = req.body
  const { type, consumedVolume, totalVolume, thingsboardAccessToken } = body;
  console.log(body)
  return sendCoapRequestToThingsboard(type, consumedVolume, totalVolume, thingsboardAccessToken);
});

module.exports = router;
