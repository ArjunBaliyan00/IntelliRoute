const express = require("express");

const router = express.Router();

const {
    dfsRoute
} = require("../controllers/dfsController");

router.post("/route", dfsRoute);

module.exports = router;