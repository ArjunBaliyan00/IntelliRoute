const db = require("../config/db");

const predictTraffic = (roadId, callback) => {

    const sql = `
        SELECT AVG(vehicle_count) AS avgVehicles
        FROM traffic_logs
        WHERE road_id = ?
    `;

    db.query(sql, [roadId], (err, result) => {

        if (err) return callback(err);

        const avg = Number(result[0].avgVehicles || 0);

        let prediction = "LOW";

        if (avg >= 80) {
            prediction = "HIGH";
        } else if (avg >= 40) {
            prediction = "MEDIUM";
        }

        // Update roads table
        db.query(
            "UPDATE roads SET traffic_level=? WHERE road_id=?",
            [prediction, roadId],
            (updateErr) => {

                if (updateErr) return callback(updateErr);

                callback(null, {
                    road_id: Number(roadId),
                    average_vehicle_count: avg,
                    predicted_traffic: prediction
                });

            }
        );

    });

};

module.exports = {
    predictTraffic
};

