const express = require("express");

const router = express.Router();

const {

    activateEmergency

} = require("../controllers/emergencyController");

router.post("/", activateEmergency);

module.exports = router;