const {
    getAllRoads,
    getRoadById,
    createRoad,
    updateRoad,
    deleteRoad,
    updateTrafficLevel,
    getCongestedRoads
} = require("../models/roadModel");

// ===================================
// GET ALL ROADS
// ===================================

const fetchAllRoads = (req, res) => {

    getAllRoads((err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: result.length,
            roads: result
        });

    });

};

// ===================================
// GET ROAD BY ID
// ===================================

const fetchRoadById = (req, res) => {

    const id = req.params.id;

    getRoadById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Road Not Found"
            });
        }

        res.status(200).json({
            success: true,
            road: result[0]
        });

    });

};

// ===================================
// ADD ROAD
// ===================================

const addRoad = (req, res) => {

    createRoad(req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Road Added Successfully",
            road_id: result.insertId
        });

    });

};

// ===================================
// UPDATE ROAD
// ===================================

const editRoad = (req, res) => {

    const id = req.params.id;

    updateRoad(id, req.body, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Road Updated Successfully"
        });

    });

};

// ===================================
// DELETE ROAD
// ===================================

const removeRoad = (req, res) => {

    const id = req.params.id;

    deleteRoad(id, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Road Deleted Successfully"
        });

    });

};

// ===================================
// UPDATE TRAFFIC
// ===================================

const changeTraffic = (req, res) => {

    const roadId = req.params.id;
    const { traffic_level } = req.body;

    updateTrafficLevel(roadId, traffic_level, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Traffic Level Updated Successfully"
        });

    });

};

// ===================================
// GET CONGESTED ROADS
// ===================================

const fetchCongestedRoads = (req, res) => {

    getCongestedRoads((err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: result.length,
            roads: result
        });

    });

};

// ===================================

module.exports = {

    fetchAllRoads,
    fetchRoadById,
    addRoad,
    editRoad,
    removeRoad,
    changeTraffic,
    fetchCongestedRoads

};