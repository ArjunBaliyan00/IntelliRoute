// ==========================================
// IntelliRoute Dashboard
// Step 45.1 (Updated)
// ==========================================

const API_URL = "http://localhost:5000/api";

// ==========================================
// Live Clock
// ==========================================

function updateClock() {

    const now = new Date();

    document.getElementById("liveTime").innerHTML =
        now.toLocaleString();

}

setInterval(updateClock, 1000);
updateClock();

// ==========================================
// Dashboard Summary
// ==========================================

async function loadDashboard() {

    try {

        const response = await fetch(`${API_URL}/dashboard/summary`);

        const data = await response.json();

        if (!data.success) return;

        document.getElementById("totalRoads").innerHTML =
            data.summary.total_roads;

        document.getElementById("openRoads").innerHTML =
            data.summary.open_roads;

        document.getElementById("closedRoads").innerHTML =
            data.summary.closed_roads;

        document.getElementById("highTraffic").innerHTML =
            data.summary.high_traffic;

        document.getElementById("lowTraffic").innerHTML =
            data.summary.low_traffic;

    }

    catch (err) {

        console.error("Dashboard Error :", err);

    }

}

// ==========================================
// Roads Table
// ==========================================

async function loadRoads() {

    try {

        const response = await fetch(`${API_URL}/roads`);

        const data = await response.json();

        if (!data.success) return;

        const table = document.getElementById("roadTable");

        table.innerHTML = "";

        data.roads.forEach((road) => {

            table.innerHTML += `

            <tr>

                <td>${road.road_id}</td>

                <td>${road.road_name}</td>

                <td>${road.traffic_level}</td>

                <td>${road.road_status}</td>

            </tr>

            `;

        });

    }

    catch (err) {

        console.error("Road Error :", err);

    }

}

// ==========================================
// Junction Signals
// ==========================================

async function loadSignals() {

    try {

        const response = await fetch(`${API_URL}/dashboard/junctions`);

        const data = await response.json();

        if (!data.success) return;

        const signal = document.getElementById("signals");

        signal.innerHTML = "";

        data.junctions.forEach((item) => {

            const color =
                item.current_signal === "GREEN"
                    ? "green"
                    : item.current_signal === "YELLOW"
                        ? "orange"
                        : "red";

            signal.innerHTML += `

            <div class="signal-card">

                <h4>Junction ${item.junction_id}</h4>

                <p style="color:${color};font-weight:bold;">
                    ${item.current_signal}
                </p>

            </div>

            `;

        });

    }

    catch (err) {

        console.error("Signal Error :", err);

    }

}

// ==========================================
// Charts
// ==========================================

let trafficChart;
let roadChart;

async function loadCharts() {

    try {

        const response = await fetch(`${API_URL}/dashboard/summary`);

        const data = await response.json();

        if (!data.success) return;

        const summary = data.summary;

        // =========================
        // Traffic Pie Chart
        // =========================

        if (trafficChart) {

            trafficChart.destroy();

        }

        trafficChart = new Chart(
            document.getElementById("trafficChart"),
            {

                type: "pie",

                data: {

                    labels: [

                        "Low Traffic",

                        "High Traffic"

                    ],

                    datasets: [{

                        data: [

                            Number(summary.low_traffic),

                            Number(summary.high_traffic)

                        ]

                    }]

                },

                options: {

                    responsive: true,

                    plugins: {

                        legend: {

                            position: "bottom"

                        }

                    }

                }

            }

        );

        // =========================
        // Road Status Bar Chart
        // =========================

        if (roadChart) {

            roadChart.destroy();

        }

        roadChart = new Chart(

            document.getElementById("roadChart"),

            {

                type: "bar",

                data: {

                    labels: [

                        "Open Roads",

                        "Closed Roads"

                    ],

                    datasets: [{

                        label: "Road Count",

                        data: [

                            Number(summary.open_roads),

                            Number(summary.closed_roads)

                        ]

                    }]

                },

                options: {

                    responsive: true,

                    scales: {

                        y: {

                            beginAtZero: true

                        }

                    }

                }

            }

        );

    }

    catch (err) {

        console.error(err);

    }

}

// ==========================================
// Refresh Dashboard
// ==========================================

async function refreshDashboard() {

    await loadDashboard();

    await loadRoads();

    await loadSignals();

    await loadCharts();

}

// ==========================================
// Initialize
// ==========================================

window.onload = () => {

    refreshDashboard();

};

// Auto Refresh Every 10 Seconds

setInterval(refreshDashboard, 10000);