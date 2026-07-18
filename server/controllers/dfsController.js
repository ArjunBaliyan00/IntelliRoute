const { buildGraph } = require("../services/graphService");
const dfs = require("../algorithms/dfs");

// ======================================
// DFS Route Search
// ======================================

const dfsRoute = (req, res) => {

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

        const result = dfs(
            graph,
            Number(source),
            Number(destination)
        );

        if (!result.reachable) {

            return res.status(404).json({
                success: false,
                message: "Destination is not reachable using DFS."
            });

        }

        res.status(200).json({
            success: true,
            algorithm: "Depth First Search (DFS)",
            source: Number(source),
            destination: Number(destination),
            path: result.path,
            total_junctions: result.path.length
        });

    });

};

module.exports = {
    dfsRoute
};