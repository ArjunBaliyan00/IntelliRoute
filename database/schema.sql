-- ==========================================
-- IntelliRoute Database Schema
-- Smart City Traffic Management System
-- ==========================================

CREATE DATABASE IF NOT EXISTS intelliroute_db;

USE intelliroute_db;

-- ==========================================
-- USERS TABLE
-- ==========================================

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- JUNCTIONS TABLE (Graph Vertices)
-- ==========================================

CREATE TABLE junctions (
    junction_id INT AUTO_INCREMENT PRIMARY KEY,
    junction_name VARCHAR(100) NOT NULL,
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    signal_status ENUM('RED','YELLOW','GREEN') DEFAULT 'RED'
);

-- ==========================================
-- ROADS TABLE (Graph Edges)
-- ==========================================

CREATE TABLE roads (
    road_id INT AUTO_INCREMENT PRIMARY KEY,
    road_name VARCHAR(100) NOT NULL,

    source_junction INT NOT NULL,
    destination_junction INT NOT NULL,

    distance DOUBLE NOT NULL,
    travel_time DOUBLE NOT NULL,

    traffic_level ENUM(
        'LOW',
        'MEDIUM',
        'HIGH'
    ) DEFAULT 'LOW',

    road_status ENUM(
        'OPEN',
        'CLOSED'
    ) DEFAULT 'OPEN',

    FOREIGN KEY(source_junction)
        REFERENCES junctions(junction_id),

    FOREIGN KEY(destination_junction)
        REFERENCES junctions(junction_id)
);

-- ==========================================
-- TRAFFIC SIGNALS
-- ==========================================

CREATE TABLE traffic_signals (

    signal_id INT AUTO_INCREMENT PRIMARY KEY,

    junction_id INT UNIQUE,

    current_signal ENUM(
        'RED',
        'YELLOW',
        'GREEN'
    ) DEFAULT 'RED',

    timer INT DEFAULT 30,

    FOREIGN KEY(junction_id)
    REFERENCES junctions(junction_id)
);

-- ==========================================
-- VEHICLES
-- ==========================================

CREATE TABLE vehicles (

    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,

    vehicle_number VARCHAR(30) UNIQUE,

    vehicle_type VARCHAR(50),

    owner_name VARCHAR(100),

    current_junction INT,

    destination_junction INT,

    FOREIGN KEY(current_junction)
    REFERENCES junctions(junction_id),

    FOREIGN KEY(destination_junction)
    REFERENCES junctions(junction_id)

);

-- ==========================================
-- ROUTES
-- ==========================================

CREATE TABLE routes (

    route_id INT AUTO_INCREMENT PRIMARY KEY,

    vehicle_id INT,

    source INT,

    destination INT,

    shortest_distance DOUBLE,

    estimated_time DOUBLE,

    algorithm_used VARCHAR(50),

    FOREIGN KEY(vehicle_id)
    REFERENCES vehicles(vehicle_id)

);

-- ==========================================
-- TRAFFIC LOGS
-- ==========================================

CREATE TABLE traffic_logs (

    log_id INT AUTO_INCREMENT PRIMARY KEY,

    road_id INT,

    vehicle_count INT,

    average_speed DOUBLE,

    congestion_level VARCHAR(30),

    log_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(road_id)
    REFERENCES roads(road_id)

);

-- ==========================================
-- EMERGENCY VEHICLES
-- ==========================================

CREATE TABLE emergency_vehicles (

    emergency_id INT AUTO_INCREMENT PRIMARY KEY,

    vehicle_id INT,

    priority_level INT DEFAULT 1,

    emergency_type VARCHAR(50),

    status VARCHAR(50),

    FOREIGN KEY(vehicle_id)
    REFERENCES vehicles(vehicle_id)

);
