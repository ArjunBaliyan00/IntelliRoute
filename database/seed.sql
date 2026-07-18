USE intelliroute_db;

-- ===========================
-- JUNCTIONS
-- ===========================

INSERT INTO junctions
(junction_name, latitude, longitude, signal_status)
VALUES
('LPU Main Gate',31.2536,75.7033,'GREEN'),
('Phagwara Chowk',31.2245,75.7710,'RED'),
('Bus Stand',31.2255,75.7700,'GREEN'),
('Railway Station',31.2480,75.7800,'YELLOW'),
('Civil Hospital',31.2400,75.7600,'GREEN');



-- ===========================
-- ROADS
-- ===========================

INSERT INTO roads
(road_name,source_junction,destination_junction,distance,travel_time,traffic_level,road_status)
VALUES

('LPU Road',1,2,4.5,10,'MEDIUM','OPEN'),

('Bus Route',2,3,2.1,5,'LOW','OPEN'),

('Station Road',3,4,3.2,8,'HIGH','OPEN'),

('Hospital Road',4,5,2.7,6,'LOW','OPEN'),

('Emergency Route',1,5,5.8,12,'LOW','OPEN');



-- ===========================
-- TRAFFIC SIGNALS
-- ===========================

INSERT INTO traffic_signals
(junction_id,current_signal,timer)
VALUES

(1,'GREEN',40),

(2,'RED',50),

(3,'GREEN',35),

(4,'YELLOW',20),

(5,'GREEN',30);



-- ===========================
-- VEHICLES
-- ===========================

INSERT INTO vehicles
(vehicle_number,vehicle_type,owner_name,current_junction,destination_junction)
VALUES

('PB08AB1234','Car','Rahul Sharma',1,4),

('PB10CD5678','Bike','Aman Singh',2,5),

('UP12XY9999','Truck','Arjun Baliyan',3,1);



-- ===========================
-- ROUTES
-- ===========================

INSERT INTO routes
(vehicle_id,source,destination,shortest_distance,estimated_time,algorithm_used)
VALUES

(1,1,4,9.8,18,'Dijkstra'),

(2,2,5,6.3,12,'Dijkstra'),

(3,3,1,7.1,15,'Dijkstra');



-- ===========================
-- TRAFFIC LOGS
-- ===========================

INSERT INTO traffic_logs
(road_id,vehicle_count,average_speed,congestion_level)
VALUES

(1,120,42,'Medium'),

(2,80,50,'Low'),

(3,240,18,'High'),

(4,90,45,'Low'),

(5,40,60,'Very Low');



-- ===========================
-- EMERGENCY VEHICLES
-- ===========================

INSERT INTO emergency_vehicles
(vehicle_id,priority_level,emergency_type,status)
VALUES

(1,1,'Ambulance','Active'),

(2,2,'Police','Active');