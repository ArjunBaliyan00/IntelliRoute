const express = require("express");

const router = express.Router();

const {
    getAnalytics,
    getHeatmapData,
    getSystemStatus,
    getTrafficSummary,
    getJunctionStatus
} = require("../controllers/analyticsController");

// Analytics Dashboard
router.get("/", getAnalytics);

// Traffic Heatmap
router.get("/heatmap", getHeatmapData);
router.get("/status", getSystemStatus);
router.get("/traffic-summary", getTrafficSummary);
router.get("/junction-status", getJunctionStatus);

module.exports = router;