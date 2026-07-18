const getRecommendation = (path, distance, trafficLevel) => {

    let recommendation = "";

    if (trafficLevel === "LOW") {
        recommendation =
            "Recommended because traffic is low and travel time is minimum.";
    }
    else if (trafficLevel === "MEDIUM") {
        recommendation =
            "Moderate traffic detected. This route is still efficient.";
    }
    else {
        recommendation =
            "Heavy traffic detected. Consider alternate routes if available.";
    }

    return {
        recommended_route: path,
        total_distance: distance,
        traffic: trafficLevel,
        recommendation
    };
};

module.exports = {
    getRecommendation
};