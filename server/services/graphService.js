const db = require("../config/db");

// =============================
// Build Smart AI Graph
// =============================

const buildGraph = (callback) => {

    db.query("SELECT * FROM roads", (err, roads) => {

        if (err) {
            return callback(err);
        }

        const graph = {};

        console.log("\n========== ROADS FROM DATABASE ==========\n");

        roads.forEach((road) => {

            console.log(
                `Road ID: ${road.road_id}
Road Name: ${road.road_name}
${road.source_junction} --> ${road.destination_junction}
Status: ${road.road_status}
Traffic: ${road.traffic_level}
Distance: ${road.distance}
Travel Time: ${road.travel_time}
-----------------------------------------`
            );

            // Ignore Closed Roads
            if (
                road.road_status &&
                road.road_status.toUpperCase() === "CLOSED"
            ) {
                console.log(`❌ Skipping CLOSED Road ${road.road_id}\n`);
                return;
            }

            const source = Number(road.source_junction);
            const destination = Number(road.destination_junction);

            if (!graph[source]) graph[source] = [];
            if (!graph[destination]) graph[destination] = [];

            // =============================
            // AI Weight Formula
            // =============================

            const distance = Number(road.distance);
            const travelTime = Number(road.travel_time);

            let weight = 0;

            switch ((road.traffic_level || "").toUpperCase()) {

                case "LOW":
                    weight = (distance * 0.7) + (travelTime * 0.3);
                    break;

                case "MEDIUM":
                    weight = (distance * 1.2) + (travelTime * 1.5);
                    break;

                case "HIGH":
                    weight = (distance * 2.5) + (travelTime * 3);
                    break;

                default:
                    weight = distance + travelTime;
            }

            console.log(
                `✅ AI Weight -> Road ${road.road_id}: ${weight.toFixed(2)}`
            );

            // Forward Edge
            graph[source].push({
                node: destination,
                weight: weight
            });

            // Reverse Edge
            graph[destination].push({
                node: source,
                weight: weight
            });

        });

        console.log("\n========== GENERATED GRAPH ==========");
        console.log(JSON.stringify(graph, null, 2));
        console.log("=====================================\n");

        callback(null, graph);

    });

};

module.exports = {
    buildGraph
};