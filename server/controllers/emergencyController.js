// ==========================================
// IntelliRoute Emergency Controller
// ==========================================

const { buildGraph } = require("../services/graphService");
const astar = require("../algorithms/astar");

const activateEmergency = (req, res) => {

    const { vehicle, source, destination } = req.body;

    if (!vehicle || !source || !destination) {

        return res.status(400).json({
            success: false,
            message: "Vehicle, Source and Destination are required."
        });

    }

    buildGraph((err, graph) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        const result = astar(
            graph,
            Number(source),
            Number(destination)
        );

        if (result.distance === Infinity) {

            return res.status(404).json({
                success: false,
                message: "Route not found."
            });

        }

        res.status(200).json({

            success: true,

            vehicle,

            path: result.path,

            total_distance: result.distance,

            message: "Green Corridor Activated Successfully"

        });

    });

};

module.exports = {

    activateEmergency

};