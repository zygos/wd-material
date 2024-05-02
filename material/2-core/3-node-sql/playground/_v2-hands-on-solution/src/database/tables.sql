CREATE TABLE IF NOT EXISTS customer (
  id integer PRIMARY KEY,
  name varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS address (
  id integer PRIMARY KEY,
  name varchar NOT NULL,
  address_full varchar NOT NULL,
  customer_id integer NOT NULL
);

CREATE TABLE IF NOT EXISTS delivery (
  id integer PRIMARY KEY,
  customer_id integer NOT NULL,
  pickup_address_id integer,
  destination_address_id integer,
  weight decimal NOT NULL,
  pickup_at timestamp,
  delivered_at timestamp
);
