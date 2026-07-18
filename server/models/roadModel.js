const db = require("../config/db");

// ==============================
// GET ALL ROADS
// ==============================

const getAllRoads = (callback) => {

    const sql = `
        SELECT road_id,
               road_name,
               source_junction,
               destination_junction,
               distance,
               travel_time,
               traffic_level,
               road_status
        FROM roads
    `;

    db.query(sql, callback);

};

// ==============================
// GET ROAD BY ID
// ==============================

const getRoadById = (id, callback) => {

    const sql = `
        SELECT road_id,
               road_name,
               source_junction,
               destination_junction,
               distance,
               travel_time,
               traffic_level,
               road_status
        FROM roads
        WHERE road_id = ?
    `;

    db.query(sql, [id], callback);

};

// ==============================
// CREATE ROAD
// ==============================

const createRoad = (road, callback) => {

    const sql = `
        INSERT INTO roads
        (
            road_name,
            source_junction,
            destination_junction,
            distance,
            travel_time,
            traffic_level,
            road_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [

        road.road_name,
        road.source_junction,
        road.destination_junction,
        road.distance,
        road.travel_time,
        road.traffic_level,
        road.road_status

    ], callback);

};

// ==============================
// UPDATE ROAD
// ==============================

const updateRoad = (id, road, callback) => {

    const sql = `
        UPDATE roads
        SET
            road_name=?,
            distance=?,
            travel_time=?,
            traffic_level=?,
            road_status=?
        WHERE road_id=?
    `;

    db.query(sql, [

        road.road_name,
        road.distance,
        road.travel_time,
        road.traffic_level,
        road.road_status,
        id

    ], callback);

};

// ==============================
// DELETE ROAD
// ==============================

const deleteRoad = (id, callback) => {

    const sql = `
        DELETE FROM roads
        WHERE road_id = ?
    `;

    db.query(sql, [id], callback);

};

// ==============================
// UPDATE TRAFFIC LEVEL
// ==============================

const updateTrafficLevel = (roadId, trafficLevel, callback) => {

    const sql = `
        UPDATE roads
        SET traffic_level = ?
        WHERE road_id = ?
    `;

    db.query(sql, [trafficLevel, roadId], callback);

};

// ==============================
// GET CONGESTED ROADS
// ==============================

const getCongestedRoads = (callback) => {

    const sql = `
        SELECT
            road_id,
            road_name,
            source_junction,
            destination_junction,
            distance,
            travel_time,
            traffic_level,
            road_status
        FROM roads
        WHERE traffic_level='HIGH'
        ORDER BY distance ASC
    `;

    db.query(sql, callback);

};

// ==============================

module.exports = {

    getAllRoads,
    getRoadById,
    createRoad,
    updateRoad,
    deleteRoad,
    updateTrafficLevel,
    getCongestedRoads

};