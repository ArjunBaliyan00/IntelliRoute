// ==========================================
// IntelliRoute - Route Finder
// ==========================================

const API_URL = "http://localhost:5000/api";

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

        data.junctions.forEach(junction => {

            source.innerHTML += `
                <option value="${junction.junction_id}">
                    Junction ${junction.junction_id}
                </option>
            `;

            destination.innerHTML += `
                <option value="${junction.junction_id}">
                    Junction ${junction.junction_id}
                </option>
            `;

        });

    }

    catch (err) {

        console.error(err);
        alert("Error loading junctions.");

    }

}

// ==========================================
// Find Best Route
// ==========================================

async function findRoute() {

    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;

    if (source === destination) {

        alert("Source and Destination cannot be same.");

        return;

    }

    try {

        const response = await fetch(`${API_URL}/astar/route`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                source: Number(source),
                destination: Number(destination)

            })

        });

        const data = await response.json();

        if (!data.success) {

            alert(data.message || "Route not found.");

            return;

        }

        document.getElementById("algo").innerHTML =
            data.algorithm || "A* Search";

        document.getElementById("distance").innerHTML =
            Number(data.total_distance).toFixed(2) + " KM";

        document.getElementById("eta").innerHTML =
            (Number(data.total_distance) * 2).toFixed(1) + " Minutes";

        document.getElementById("path").innerHTML =
            data.path.join(" ➜ ");

    }

    catch (err) {

        console.error(err);

        alert("Server Error.");

    }

}

// ==========================================
// Initialize
// ==========================================

window.onload = () => {

    loadJunctions();

};