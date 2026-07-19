// ==========================================
// IntelliRoute Live Map
// ==========================================

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://intelliroute-backend-fdva.onrender.com/api";

// ==========================================
// Initialize Map
// ==========================================

const map = L.map("map").setView([31.2536, 75.7033], 15);

// ==========================================
// OpenStreetMap Layer
// ==========================================

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap Contributors"
}).addTo(map);

// ==========================================
// Demo Junction Coordinates
// ==========================================

const junctionCoordinates = {

    1: [31.2536, 75.7033],
    2: [31.2550, 75.7052],
    3: [31.2565, 75.7070],
    4: [31.2580, 75.7090],
    5: [31.2600, 75.7110]

};

// ==========================================
// Layers
// ==========================================

let routeLine = null;

let sourceMarker = null;

let destinationMarker = null;

let ambulanceMarker = null;

let animationInterval = null;

// ==========================================
// Default Junction Markers
// ==========================================

Object.keys(junctionCoordinates).forEach(id => {

    L.marker(junctionCoordinates[id])

        .addTo(map)

        .bindPopup(`Junction ${id}`);

});

// ==========================================
// Load Junctions
// ==========================================

async function loadJunctions() {

    try {

        const response = await fetch(`${API_URL}/dashboard/junctions`);

        const data = await response.json();

        if (!data.success) {

            alert("Unable to load junctions.");

            return;

        }

        const source = document.getElementById("source");

        const destination = document.getElementById("destination");

        source.innerHTML = "";

        destination.innerHTML = "";

        data.junctions.forEach(j => {

            source.innerHTML += `
                <option value="${j.junction_id}">
                    Junction ${j.junction_id}
                </option>
            `;

            destination.innerHTML += `
                <option value="${j.junction_id}">
                    Junction ${j.junction_id}
                </option>
            `;

        });

    }

    catch (err) {

        console.error(err);

    }

}

// ==========================================
// Draw Route
// ==========================================

async function drawRoute() {

    const source =
        Number(document.getElementById("source").value);

    const destination =
        Number(document.getElementById("destination").value);

    if (source === destination) {

        alert("Source and Destination cannot be same.");

        return;

    }

    try {

        const response = await fetch(

            `${API_URL}/astar/route`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    source,
                    destination

                })

            }

        );

        const data = await response.json();

        console.log(data);

        if (!data.success) {

            alert(data.message);

            return;

        }

        // ==================================
        // Remove Old Route
        // ==================================

        if (routeLine) {

            map.removeLayer(routeLine);

        }

        if (sourceMarker) {

            map.removeLayer(sourceMarker);

        }

        if (destinationMarker) {

            map.removeLayer(destinationMarker);

        }

        if (ambulanceMarker) {

            map.removeLayer(ambulanceMarker);

        }

        if (animationInterval) {

            clearInterval(animationInterval);

        }

        // ==================================
        // Convert Path to Coordinates
        // ==================================

        const coordinates = data.path.map(id => junctionCoordinates[id]);

        // ==================================
        // Draw Green Route
        // ==================================

        routeLine = L.polyline(

            coordinates,

            {

                color: "green",

                weight: 6,

                opacity: 0.8

            }

        ).addTo(map);

        // ==================================
        // Source Marker
        // ==================================

        sourceMarker = L.circleMarker(

            junctionCoordinates[source],

            {

                radius: 10,

                color: "green",

                fillColor: "green",

                fillOpacity: 1

            }

        )

        .addTo(map)

        .bindPopup("🟢 Source");

        // ==================================
        // Destination Marker
        // ==================================

        destinationMarker = L.circleMarker(

            junctionCoordinates[destination],

            {

                radius: 10,

                color: "red",

                fillColor: "red",

                fillOpacity: 1

            }

        )

        .addTo(map)

        .bindPopup("🔴 Destination");

        // ==================================
        // Ambulance Marker
        // ==================================

        ambulanceMarker = L.marker(

            coordinates[0]

        ).addTo(map);

        let current = 0;

        animationInterval = setInterval(() => {

            current++;

            if (current >= coordinates.length) {

                clearInterval(animationInterval);

                ambulanceMarker.bindPopup(

                    "🚑 Destination Reached"

                ).openPopup();

                return;

            }

            ambulanceMarker.setLatLng(

                coordinates[current]

            );

        }, 1000);

        // ==================================
        // Zoom
        // ==================================

        map.fitBounds(routeLine.getBounds());

        alert(

            `✅ Route Found

Distance : ${Number(data.total_distance).toFixed(2)} KM`

        );

    }

    catch (err) {

        console.error(err);

        alert("Server Error");

    }

}

// ==========================================
// Initialize
// ==========================================

window.onload = () => {

    loadJunctions();

};