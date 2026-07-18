const db = require("../config/db");

const getHeatmapData = (req, res) => {

    const sql = `
        SELECT
            road_id,
            road_name,
            source_junction,
            destination_junction,
            distance,
            traffic_level,
            road_status
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
            roads: result
        });

    });

};

module.exports = {
    getHeatmapData
};