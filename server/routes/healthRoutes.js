const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        project: "IntelliRoute",
        version: "1.0.0",
        status: "Server Running Successfully"
    });

});

module.exports = router;