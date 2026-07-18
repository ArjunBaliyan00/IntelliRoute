const { buildGraph } = require("../services/graphService");
const dijkstra = require("../algorithms/dijkstra");
const { getRecommendation } = require("../services/recommendationService");

// ====================================
// Smart Route Recommendation API
// ====================================

const getShortestPath = (req, res) => {

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

        // ===========================
        // Run Dijkstra Algorithm
        // ===========================

        const result = dijkstra(
            graph,
            Number(source),
            Number(destination)
        );

        // ===========================
        // No Route Found
        // ===========================

        if (
            result.distance === Infinity ||
            result.path.length === 0
        ) {
            return res.status(404).json({
                success: false,
                message: "No route found because the road is closed or unreachable."
            });
        }

        // ===========================
        // Estimated Time
        // ===========================

        const estimatedTime = Number(
            (result.distance * 2).toFixed(2)
        );

        // ===========================
        // Traffic Level
        // ===========================

        let trafficLevel = "LOW";

        if (result.distance > 15) {
            trafficLevel = "HIGH";
        }
        else if (result.distance > 8) {
            trafficLevel = "MEDIUM";
        }

        // ===========================
        // AI Recommendation
        // ===========================

        const recommendation = getRecommendation(
            result.path,
            result.distance,
            trafficLevel
        );

        // ===========================
        // Final Response
        // ===========================

        return res.status(200).json({
            success: true,
            source: Number(source),
            destination: Number(destination),
            recommended_route: recommendation.recommended_route,
            total_distance: recommendation.total_distance,
            estimated_time: estimatedTime,
            traffic: recommendation.traffic,
            recommendation: recommendation.recommendation
        });

    });

};

module.exports = {
    getShortestPath
};