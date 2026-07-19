// ==========================================
// IntelliRoute Heat Map
// ==========================================

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://intelliroute-backend-fdva.onrender.com/api";

// ==========================================
// Initialize Map
// ==========================================

const map = L.map("map").setView([31.2536, 75.7033], 15);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap Contributors",
        maxZoom: 19
    }
).addTo(map);

// ==========================================
// Demo Junction Coordinates
// ==========================================

const junctionCoordinates = {

    1:[31.2536,75.7033],

    2:[31.2550,75.7052],

    3:[31.2565,75.7070],

    4:[31.2580,75.7090],

    5:[31.2600,75.7110]

};

// ==========================================
// Draw Heat Map
// ==========================================

async function loadHeatMap(){

    try{

        const response = await fetch(

            `${API_URL}/roads`

        );

        const data = await response.json();

        if(!data.success){

            alert("Unable to load roads.");

            return;

        }

        data.roads.forEach(road=>{

            const start =
                junctionCoordinates[road.source_junction];

            const end =
                junctionCoordinates[road.destination_junction];

            if(!start || !end) return;

            let color = "#22c55e";

            if(road.road_status==="CLOSED"){

                color="#6b7280";

            }

            else if(road.traffic_level==="HIGH"){

                color="#ef4444";

            }

            else if(road.traffic_level==="MEDIUM"){

                color="#facc15";

            }

            L.polyline(

                [start,end],

                {

                    color:color,

                    weight:7,

                    opacity:.9

                }

            )

            .addTo(map)

            .bindPopup(

                `<b>${road.road_name}</b><br>

                Traffic : ${road.traffic_level}<br>

                Status : ${road.road_status}`

            );

        });

    }

    catch(err){

        console.log(err);

        alert("Server Error");

    }

}

// ==========================================

loadHeatMap();