-- DB creation
-- Providers table
DROP SEQUENCE seq_pk_Providers;
DROP TABLE Providers;

CREATE SEQUENCE seq_pk_Providers
  START WITH 1
  INCREMENT BY 1;

CREATE TABLE Providers (
    id NUMBER PRIMARY KEY,
    provider_name VARCHAR2(50),
    execution_duration NUMBER
);

CREATE OR REPLACE TRIGGER trg_pk_Providers
BEFORE INSERT ON Providers
FOR EACH ROW
BEGIN
    SELECT seq_pk_Providers.NEXTVAL INTO :new.id FROM dual;
END;

-- StorageLocations table
DROP SEQUENCE seq_pk_StorageLocations;
DROP TABLE StorageLocations;

CREATE SEQUENCE seq_pk_StorageLocations
  START WITH 1
  INCREMENT BY 1;

CREATE TABLE StorageLocations (
    id NUMBER PRIMARY KEY,
    provider_id NUMBER,
    unit_price NUMBER,
    location_name VARCHAR2(20),
    location_description VARCHAR2(50),
    FOREIGN KEY (provider_id) REFERENCES Providers(id)
);

CREATE OR REPLACE TRIGGER trg_pk_StorageLocations
BEFORE INSERT ON StorageLocations
FOR EACH ROW
BEGIN
    SELECT seq_pk_StorageLocations.NEXTVAL INTO :new.id FROM dual;
END;

-- Clients table
DROP SEQUENCE seq_pk_Clients;
DROP TABLE Clients;

CREATE SEQUENCE seq_pk_Clients
  START WITH 1
  INCREMENT BY 1;

CREATE TABLE Clients (
    id NUMBER PRIMARY KEY,
    last_name VARCHAR2(50),
    first_name VARCHAR2(50),
    company VARCHAR2(100),
    adress VARCHAR2(200),
    city VARCHAR2(50),
    postal_code VARCHAR2(20),
    phone_number VARCHAR2(10)
);

CREATE OR REPLACE TRIGGER trg_pk_Clients
BEFORE INSERT ON Clients
FOR EACH ROW
BEGIN
    SELECT seq_pk_Clients.NEXTVAL INTO :new.id FROM dual;
END;

-- Orders table
DROP SEQUENCE seq_pk_Orders;
DROP TABLE Orders;

CREATE SEQUENCE seq_pk_Orders
  START WITH 1
  INCREMENT BY 1;

CREATE TABLE Orders (
    id NUMBER PRIMARY KEY,
    client_id NUMBER,
    order_date DATE,
    delivery_date DATE,
    pay_date DATE,
    FOREIGN KEY (client_id) REFERENCES Clients(id)
);

CREATE OR REPLACE TRIGGER trg_pk_Orders
BEFORE INSERT ON Orders
FOR EACH ROW
BEGIN
    SELECT seq_pk_Orders.NEXTVAL INTO :new.id FROM dual;
END;

-- Items table
DROP SEQUENCE seq_pk_Items;
DROP TABLE Items;

CREATE SEQUENCE seq_pk_Items
  START WITH 1
  INCREMENT BY 1;

CREATE TABLE Items (
    id NUMBER PRIMARY KEY,
    order_id NUMBER,
    storage_location_id NUMBER,
    quantity NUMBER,
    total_price NUMBER,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (storage_location_id) REFERENCES StorageLocations(id)
);

CREATE OR REPLACE TRIGGER trg_pk_Items
BEFORE INSERT ON Items
FOR EACH ROW
BEGIN
    SELECT seq_pk_Items.NEXTVAL INTO :new.id FROM dual;
END;


-- Seed data
INSERT INTO Providers (provider_name, execution_duration) VALUES ('Ferma lui Nea Ion', 5);
INSERT INTO Providers (provider_name, execution_duration) VALUES ('Metalurgie Inedita', 7);
INSERT INTO Providers (provider_name, execution_duration) VALUES ('Cheap Electronics Johnson', 3);
INSERT INTO Providers (provider_name, execution_duration) VALUES ('Beer SRL', 8);
SELECT * FROM Providers;

INSERT INTO StorageLocations (provider_id, unit_price, location_name, location_description) VALUES (1, 01.1, 'N', 'No description');
INSERT INTO StorageLocations (provider_id, unit_price, location_name, location_description) VALUES (2, 22.2, 'V', 'No description');
INSERT INTO StorageLocations (provider_id, unit_price, location_name, location_description) VALUES (3, 03.3, 'E', 'No description');
INSERT INTO StorageLocations (provider_id, unit_price, location_name, location_description) VALUES (4, 44.4, 'S', 'No description');
SELECT * FROM StorageLocations;

INSERT INTO Clients (last_name, first_name, company, adress, city, postal_code, phone_number) VALUES ('Adi', 'Minune', 'MinuniLaMinut', 'Strada Minunii', 'Constanta', '111', '0742111111');
INSERT INTO Clients (last_name, first_name, company, adress, city, postal_code, phone_number) VALUES ('Tanta', 'Clejana', 'Cozonaria Tarnava', 'Strada Cozonacilor', 'Craiova', '222', '0742222222');
INSERT INTO Clients (last_name, first_name, company, adress, city, postal_code, phone_number) VALUES ('Robert', 'Cerbasu', 'GSM Top Electronice', 'Patria', 'Bucuresti', '333', '0742333333');
INSERT INTO Clients (last_name, first_name, company, adress, city, postal_code, phone_number) VALUES ('Constantin', 'Catalin', 'La Fereastra', 'Strada Moldovei Vechi', 'Iasi', '444', '0742444444');
SELECT * FROM Clients;

INSERT INTO Orders (client_id, order_date, delivery_date, pay_date) VALUES (1, TO_DATE('2023-01-01', 'YYYY-MM-DD'), TO_DATE('2023-01-01', 'YYYY-MM-DD'), TO_DATE('2023-01-01', 'YYYY-MM-DD'));
INSERT INTO Orders (client_id, order_date, delivery_date, pay_date) VALUES (2, TO_DATE('2023-02-02', 'YYYY-MM-DD'), TO_DATE('2023-02-02', 'YYYY-MM-DD'), TO_DATE('2023-02-02', 'YYYY-MM-DD'));
INSERT INTO Orders (client_id, order_date, delivery_date, pay_date) VALUES (3, TO_DATE('2023-03-03', 'YYYY-MM-DD'), TO_DATE('2023-03-03', 'YYYY-MM-DD'), TO_DATE('2023-03-03', 'YYYY-MM-DD'));
INSERT INTO Orders (client_id, order_date, delivery_date, pay_date) VALUES (4, TO_DATE('2023-04-04', 'YYYY-MM-DD'), TO_DATE('2023-04-04', 'YYYY-MM-DD'), TO_DATE('2023-04-04', 'YYYY-MM-DD'));
SELECT * FROM Orders;

INSERT INTO Items (order_id, storage_location_id , quantity, total_price) VALUES (1, 1, 2, 11.1);
INSERT INTO Items (order_id, storage_location_id , quantity, total_price) VALUES (2, 2, 3, 22.2);
INSERT INTO Items (order_id, storage_location_id , quantity, total_price) VALUES (3, 3, 1, 33.3);
INSERT INTO Items (order_id, storage_location_id , quantity, total_price) VALUES (4, 4, 4, 44.4);
SELECT * FROM Items;



