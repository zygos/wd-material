-- Seed data for customer table
INSERT INTO customer (id, name) VALUES
(1, 'Albert Einstein'),
(2, 'Marie Curie'),
(3, 'Isaac Newton'),
(4, 'Nikola Tesla');

-- Seed data for address table
INSERT INTO address (id, name, address_full, customer_id) VALUES
(1, 'Home', '123 Main St', 1),
(2, 'Work', '456 Elm St', 2),
(3, 'Office', '789 Oak St', 3),
(4, 'Lab', '321 Pine St', 4);

-- Seed data for delivery table
INSERT INTO delivery (id, customer_id, pickup_address_id, destination_address_id, weight, pickup_at, delivered_at) VALUES
(1, 1, 1, 2, 10.5, '2022-01-01 10:00:00', NULL),
(2, 2, 3, 4, 8.2, '2022-01-02 09:00:00', NULL),
(3, 3, 2, 3, 5.7, '2022-01-03 11:00:00', NULL),
(4, 4, 4, 1, 12.3, '2022-01-04 08:00:00', NULL);
