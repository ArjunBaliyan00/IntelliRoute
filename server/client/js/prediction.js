// ==========================================
// IntelliRoute AI Prediction
// ==========================================

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://intelliroute-backend-fdva.onrender.com/api";

// ==========================================

async function predictTraffic() {

    const roadId = document.getElementById("road").value;

    try {

        const response = await fetch(

            `${API_URL}/prediction?road=${roadId}`

        );

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        document.getElementById("roadName").innerHTML =
            data.road;

        document.getElementById("currentTraffic").innerHTML =
            data.current;

        document.getElementById("prediction").innerHTML =
            data.prediction;

        document.getElementById("confidence").innerHTML =
            data.confidence + "%";

        document.getElementById("after").innerHTML =
            data.after;

    }

    catch (err) {

        console.log(err);

        alert("Server Error");

    }

}

// ==========================================

window.onload = () => {

    predictTraffic();

};

document.getElementById("road").addEventListener(

    "change",

    predictTraffic

);