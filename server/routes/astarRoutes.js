const express = require("express");

const router = express.Router();

const {
    astarRoute
} = require("../controllers/astarController");

router.post("/route", astarRoute);

module.exports = router;