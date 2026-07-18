const express = require("express");

const router = express.Router();

const {
    fetchAllRoads,
    fetchRoadById,
    addRoad,
    editRoad,
    removeRoad,
    changeTraffic,
    fetchCongestedRoads
} = require("../controllers/roadController");

// ==============================
// GET ALL ROADS
// ==============================

router.get("/", fetchAllRoads);

// ==============================
// GET CONGESTED ROADS
// ==============================

router.get("/congested", fetchCongestedRoads);

// ==============================
// GET ROAD BY ID
// ==============================

router.get("/:id", fetchRoadById);

// ==============================
// ADD ROAD
// ==============================

router.post("/", addRoad);

// ==============================
// UPDATE ROAD
// ==============================

router.put("/:id", editRoad);

// ==============================
// DELETE ROAD
// ==============================

router.delete("/:id", removeRoad);

// ==============================
// UPDATE TRAFFIC LEVEL
// ==============================

router.put("/:id/traffic", changeTraffic);

module.exports = router;