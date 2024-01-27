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

CREATE TABLE IF NOT EXISTS driver (
  id integer PRIMARY KEY,
  name varchar NOT NULL,
  license_number varchar NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS invoice (
  id integer PRIMARY KEY,
  serial_number varchar NOT NULL UNIQUE,
  amount decimal NOT NULL,
  currency varchar NOT NULL,
  invoiced_at timestamp NOT NULL,
  paid_at timestamp
);

CREATE TABLE IF NOT EXISTS package (
  id integer PRIMARY KEY,
  customer_id integer NOT NULL,
  driver_id integer,
  pickup_address_id integer,
  delivery_address_id integer,
  invoice_id integer,
  description varchar NOT NULL,
  weight decimal NOT NULL,
  height decimal NOT NULL,
  width decimal NOT NULL,
  length decimal NOT NULL,
  size_unit varchar NOT NULL,
  pickup_at timestamp,
  delivered_at timestamp
);
