const db = require("../config/db");

// ============================================
// Dashboard Summary
// ============================================

const getDashboard = (req, res) => {

    const sql = `
        SELECT
            COUNT(*) AS total_roads,

            SUM(CASE WHEN traffic_level='LOW' THEN 1 ELSE 0 END) AS low_traffic,

            SUM(CASE WHEN traffic_level='MEDIUM' THEN 1 ELSE 0 END) AS medium_traffic,

            SUM(CASE WHEN traffic_level='HIGH' THEN 1 ELSE 0 END) AS high_traffic,

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

        res.status(200).json({
            success: true,
            dashboard: result[0]
        });

    });

};

// ============================================
// Dashboard Summary API
// ============================================

const getDashboardSummary = (req, res) => {

    const sql = `
        SELECT
            COUNT(*) AS total_roads,

            SUM(CASE WHEN road_status='OPEN' THEN 1 ELSE 0 END) AS open_roads,

            SUM(CASE WHEN road_status='CLOSED' THEN 1 ELSE 0 END) AS closed_roads,

            SUM(CASE WHEN traffic_level='HIGH' THEN 1 ELSE 0 END) AS high_traffic,

            SUM(CASE WHEN traffic_level='LOW' THEN 1 ELSE 0 END) AS low_traffic

        FROM roads
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            summary: result[0]
        });

    });

};

// ============================================
// Junction Signals API
// ============================================

const getJunctionSignals = (req, res) => {

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

        res.json({
            success: true,
            junctions: result
        });

    });

};

module.exports = {
    getDashboard,
    getDashboardSummary,
    getJunctionSignals
};