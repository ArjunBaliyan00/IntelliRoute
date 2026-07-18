const express = require("express");

const router = express.Router();

const {
    bfsRoute
} = require("../controllers/bfsController");

router.post("/route", bfsRoute);

module.exports = router;