const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/healthRoutes");
const userRoutes = require("./routes/userRoutes");
const roadRoutes = require("./routes/roadRoutes");
const graphRoutes = require("./routes/graphRoutes");
const pathRoutes = require("./routes/pathRoutes");
const trafficPredictionRoutes = require("./routes/trafficPredictionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const heatmapRoutes = require("./routes/heatmapRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const bfsRoutes = require("./routes/bfsRoutes");
const dfsRoutes = require("./routes/dfsRoutes");
const astarRoutes = require("./routes/astarRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// =============================
// API Routes
// =============================

app.use("/api/health", healthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roads", roadRoutes);
app.use("/api/graph", graphRoutes);
app.use("/api/path", pathRoutes);
app.use("/api/traffic", trafficPredictionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/heatmap", heatmapRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/bfs", bfsRoutes);
app.use("/api/dfs", dfsRoutes);
app.use("/api/astar", astarRoutes);
app.use("/api/prediction", predictionRoutes);
app.use("/api/emergency", emergencyRoutes);

module.exports = app;