const express = require("express");

const router = express.Router();

const {
    getDashboard,
    getDashboardSummary,
    getJunctionSignals
} = require("../controllers/dashboardController");

router.get("/", getDashboard);

router.get("/summary", getDashboardSummary);

router.get("/junctions", getJunctionSignals);

module.exports = router;