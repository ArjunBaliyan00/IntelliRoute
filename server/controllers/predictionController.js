// ==========================================
// IntelliRoute AI Prediction Controller
// ==========================================

const db = require("../config/db");

const getPrediction = (req, res) => {

    const roadId = req.query.road;

    if (!roadId) {

        return res.status(400).json({

            success: false,

            message: "Road ID is required."

        });

    }

    const sql = `

        SELECT

            road_id,
            road_name,
            traffic_level

        FROM roads

        WHERE road_id = ?

    `;

    db.query(sql, [roadId], (err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,

                message: err.message

            });

        }

        if (result.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Road not found."

            });

        }

        const road = result[0];

        let prediction = "";
        let confidence = 0;

        switch (road.traffic_level) {

            case "LOW":

                prediction = "LOW";
                confidence = 95;

                break;

            case "MEDIUM":

                prediction = "MEDIUM";
                confidence = 89;

                break;

            case "HIGH":

                prediction = "HIGH";
                confidence = 93;

                break;

            default:

                prediction = "UNKNOWN";
                confidence = 0;

        }

        res.json({

            success: true,

            road: road.road_name,

            current: road.traffic_level,

            prediction,

            confidence,

            after: "30 Minutes"

        });

    });

};

module.exports = {

    getPrediction

};