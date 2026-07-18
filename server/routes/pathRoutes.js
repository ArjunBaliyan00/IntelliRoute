const express = require("express");

const router = express.Router();

const {
    getShortestPath
} = require("../controllers/pathController");

// POST API
router.post("/shortest", getShortestPath);

module.exports = router;