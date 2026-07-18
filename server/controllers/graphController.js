const { buildGraph } = require("../services/graphService");

const getGraph = (req, res) => {

    buildGraph((err, graph) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            graph
        });

    });

};

module.exports = {
    getGraph
};