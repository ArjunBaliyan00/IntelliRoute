// ==========================================
// IntelliRoute Settings
// ==========================================

// ==========================================
// Refresh System
// ==========================================

function refreshProject() {

    alert("✅ IntelliRoute System Refreshed Successfully.");

    location.reload();

}

// ==========================================
// Back to Dashboard
// ==========================================

function goDashboard() {

    window.location.href = "dashboard.html";

}

// ==========================================
// System Information
// ==========================================

window.onload = () => {

    console.log("===================================");

    console.log("IntelliRoute Smart Traffic System");

    console.log("Version : 1.0.0");

    console.log("Developer : Arjun Baliyan");

    console.log("Status : Running");

    console.log("===================================");

};

// ==========================================
// Optional Live Status
// ==========================================

setInterval(() => {

    console.log(

        "System Health : OK | " +

        new Date().toLocaleTimeString()

    );

}, 10000);