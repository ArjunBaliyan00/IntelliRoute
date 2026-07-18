const db = require("../config/db");

// =====================================
// Analytics Dashboard
// =====================================
const getAnalytics = (req, res) => {

    const query = `
        SELECT
            COUNT(*) AS total_roads,
            SUM(distance) AS total_distance,
            AVG(distance) AS average_distance,
            SUM(CASE WHEN traffic_level='HIGH' THEN 1 ELSE 0 END) AS high_traffic_roads,
            SUM(CASE WHEN traffic_level='LOW' THEN 1 ELSE 0 END) AS low_traffic_roads,
            SUM(CASE WHEN road_status='OPEN' THEN 1 ELSE 0 END) AS open_roads,
            SUM(CASE WHEN road_status='CLOSED' THEN 1 ELSE 0 END) AS closed_roads
        FROM roads
    `;

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            analytics: result[0]
        });

    });

};

// =====================================
// Traffic Heatmap API
// =====================================
const getHeatmapData = (req, res) => {

    const query = `
        SELECT
            road_id,
            road_name,
            source_junction,
            destination_junction,
            traffic_level
        FROM roads
        ORDER BY road_id ASC
    `;

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            heatmap: result
        });

    });

};
// =====================================
// System Status API
// =====================================
const getSystemStatus = (req, res) => {

    res.json({
        success: true,
        system: {
            server: "ONLINE",
            database: "CONNECTED",
            ai_prediction: "ACTIVE",
            emergency_routing: "ACTIVE",
            analytics: "ACTIVE",
            green_corridor: "ACTIVE",
            timestamp: new Date()
        }
    });

};
// =====================================
// Live Traffic Summary API
// =====================================
const getTrafficSummary = (req, res) => {

    const sql = `
        SELECT
            COUNT(*) AS total_roads,

            SUM(CASE WHEN traffic_level='LOW' THEN 1 ELSE 0 END) AS low,

            SUM(CASE WHEN traffic_level='MEDIUM' THEN 1 ELSE 0 END) AS medium,

            SUM(CASE WHEN traffic_level='HIGH' THEN 1 ELSE 0 END) AS high,

            SUM(CASE WHEN road_status='OPEN' THEN 1 ELSE 0 END) AS open_roads,

            SUM(CASE WHEN road_status='CLOSED' THEN 1 ELSE 0 END) AS closed_roads

        FROM roads
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        const data = result[0];

        res.status(200).json({
            success: true,
            summary: {
                total_roads: Number(data.total_roads),
                low_traffic: Number(data.low),
                medium_traffic: Number(data.medium),
                high_traffic: Number(data.high),
                open_roads: Number(data.open_roads),
                closed_roads: Number(data.closed_roads)
            }
        });

    });

};
// =====================================
// Junction Status API
// =====================================

const getJunctionStatus = (req, res) => {

    const sql = `
        SELECT
            junction_id,
            current_signal
        FROM traffic_signals
        ORDER BY junction_id ASC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            junctions: result
        });

    });

};

module.exports = {
    getAnalytics,
    getHeatmapData,
    getSystemStatus,
    getTrafficSummary,
    getJunctionStatus
};