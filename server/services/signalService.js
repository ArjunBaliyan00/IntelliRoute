const db = require("../config/db");

const activateGreenCorridor = (route, callback) => {

    // Reset all signals to RED
    db.query(
        "UPDATE traffic_signals SET current_signal='RED'",
        (err) => {

            if (err) return callback(err);

            let completed = 0;

            route.forEach((junction) => {

                db.query(
                    `UPDATE traffic_signals
                     SET current_signal='GREEN'
                     WHERE junction_id=?`,
                    [junction],
                    (err2) => {

                        if (err2) return callback(err2);

                        completed++;

                        if (completed === route.length) {

                            callback(null, {
                                success: true,
                                message: "Green Corridor Activated"
                            });

                        }

                    }
                );

            });

        }
    );

};

module.exports = {
    activateGreenCorridor
};