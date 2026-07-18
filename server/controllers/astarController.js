const { buildGraph } = require("../services/graphService");
const astar = require("../algorithms/astar");

// ======================================
// A* Route Search
// ======================================

const astarRoute = (req, res) => {

    const { source, destination } = req.body;

    if (!source || !destination) {

        return res.status(400).json({
            success: false,
            message: "Source and Destination are required"
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
                message: "Destination is not reachable using A*."
            });

        }

        res.status(200).json({
            success: true,
            algorithm: "A* Search",
            source: Number(source),
            destination: Number(destination),
            path: result.path,
            total_distance: result.distance
        });

    });

};

module.exports = {
    astarRoute
};