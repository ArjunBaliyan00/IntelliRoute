const {
    predictTraffic
} = require("../services/trafficPredictionService");

const getTrafficPrediction = (req, res) => {

    const roadId = req.params.roadId;

    predictTraffic(roadId, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            prediction: result
        });

    });

};

module.exports = {
    getTrafficPrediction
};