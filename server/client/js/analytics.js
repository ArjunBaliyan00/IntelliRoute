// ==========================================
// IntelliRoute Analytics Dashboard
// ==========================================

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://intelliroute-backend-fdva.onrender.com/api";

async function loadAnalytics(){

    try{

        const response = await fetch(`${API_URL}/dashboard/summary`);

        const data = await response.json();

        if(!data.success){

            alert("Unable to load analytics.");

            return;

        }

        const summary = data.summary;

        // =====================================
        // Traffic Doughnut Chart
        // =====================================

        new Chart(

            document.getElementById("trafficChart"),

            {

                type:"doughnut",

                data:{

                    labels:[

                        "Low Traffic",

                        "High Traffic"

                    ],

                    datasets:[{

                        data:[

                            Number(summary.low_traffic),

                            Number(summary.high_traffic)

                        ],

                        backgroundColor:[

                            "#36A2EB",

                            "#FF6384"

                        ],

                        borderColor:"#ffffff",

                        borderWidth:3,

                        hoverOffset:15

                    }]

                },

                options:{

                    responsive:true,

                    maintainAspectRatio:false,

                    cutout:"55%",

                    plugins:{

                        legend:{

                            position:"bottom",

                            labels:{

                                font:{

                                    size:15

                                }

                            }

                        }

                    }

                }

            }

        );

        // =====================================
        // Road Status Bar Chart
        // =====================================

        new Chart(

            document.getElementById("roadChart"),

            {

                type:"bar",

                data:{

                    labels:[

                        "Open Roads",

                        "Closed Roads"

                    ],

                    datasets:[{

                        label:"Road Count",

                        data:[

                            Number(summary.open_roads),

                            Number(summary.closed_roads)

                        ],

                        backgroundColor:[

                            "#4CAF50",

                            "#F44336"

                        ],

                        borderRadius:10

                    }]

                },

                options:{

                    responsive:true,

                    maintainAspectRatio:false,

                    plugins:{

                        legend:{

                            display:false

                        }

                    },

                    scales:{

                        y:{

                            beginAtZero:true,

                            ticks:{

                                stepSize:1

                            }

                        }

                    }

                }

            }

        );

    }

    catch(err){

        console.log(err);

    }

}

loadAnalytics();