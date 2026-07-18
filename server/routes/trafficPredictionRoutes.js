const express = require("express");

const router = express.Router();

const {
    getTrafficPrediction
} = require("../controllers/trafficPredictionController");

router.get("/predict/:roadId", getTrafficPrediction);

module.exports = router;