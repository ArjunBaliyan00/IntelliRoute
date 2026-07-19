// ==========================================
// IntelliRoute Emergency System
// ==========================================

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://intelliroute-backend-fdva.onrender.com/api";

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

        console.log(err);

    }

}

// ==========================================
// Activate Emergency
// ==========================================

async function activateEmergency() {

    const vehicle =
        document.getElementById("vehicle").value;

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

            `${API_URL}/emergency`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    vehicle,
                    source,
                    destination

                })

            }

        );

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        document.getElementById("vehicleName").innerHTML =
    data.vehicle;

document.getElementById("routePath").innerHTML =
    data.path.join(" ➜ ");

document.getElementById("distance").innerHTML =
    Number(data.total_distance).toFixed(2) + " KM";

document.getElementById("statusBadge").innerHTML =
    "🟢 Green Corridor Activated";

    }

    catch (err) {

        console.log(err);

        alert("Server Error");

    }

}

// ==========================================

window.onload = () => {

    loadJunctions();

};