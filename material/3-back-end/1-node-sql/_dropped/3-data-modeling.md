```sql
// You can paste this diagram at https://dbdiagram.io/d
Table client {
  id integer [primary key]
  name varchar [not null]
  phone_number varchar [not null]
}

Table vehicle {
  id integer [primary key]
  make varchar [not null]
  model varchar [not null]
  year integer
  registration_number varchar
  vin varchar [unique]
  client_id integer [not null, ref: > client.id]
}

Table service_ticket {
  id integer [primary key]
  vehicle_id integer [not null, ref: > vehicle.id]
  client_id integer [not null, ref: > client.id]
  received_at timestamp
  completed_at timestamp
  returned_at timestamp
  description text
}

Table invoice {
  id integer [primary key]
  invoice_number varchar [not null, unique]
  service_ticket_id integer [not null, ref: > service_ticket.id]
  invoiced_at timestamp [not null]
  paid_at timestamp
}

Table mechanic {
  id integer [primary key]
  name varchar [not null]
}

Table service_mechanic {
  id integer [primary key]
  mechanic_id integer [not null, ref: > mechanic.id]
  service_ticket_id integer [not null, ref: > service_ticket.id]
}

Table part {
  id integer [primary key]
  service_ticket_id integer [ref: > service_ticket.id]
  name varchar [not null]
  price decimal
  description varchar(1000)
  ordered_at timestamp
  received_at timestamp
}
```

---

```sql
// You can paste this diagram at https://dbdiagram.io/d
Table users {
  id integer [primary key]
  username varchar [unique, not null]
  email varchar [unique]
  password varchar
}

Table posts {
  id integer [primary key]
  user_id integer [not null, ref: > users.id]
  image_url varchar [not null]
  caption text
  created_at timestamp [not null]
}

Table comments {
  id integer [primary key]
  post_id integer [not null, ref: > posts.id]
  user_id integer [not null, ref: > users.id]
  text text [not null]
  created_at timestamp [not null]
}

Table followers {
  follower_id integer [not null, ref: > users.id]
  followee_id integer [not null, ref: > users.id]

  indexes {
    (follower_id, followee_id) [pk]
  }
}

Table likes {
  user_id integer [not null, ref: > users.id]
  post_id integer [not null, ref: > posts.id]

  indexes {
    (user_id, post_id) [pk]
  }
}

Table messages {
  id integer [primary key]
  sender_id integer [not null, ref: > users.id]
  receiver_id integer [not null, ref: > users.id]
  text text [not null]
  created_at timestamp [not null]
}
```

---

Updated:

```sql
Table client {
  id integer [primary key]
  name varchar [not null]
  phone_number varchar [not null]
}

Table vehicle {
  id integer [primary key]
  make varchar [not null]
  model varchar [not null]
  year integer
  registration_number varchar
  vin varchar [unique]
  client_id integer [not null, ref: > client.id]
}

Table service_ticket {
  id integer [primary key]
  vehicle_id integer [not null, ref: > vehicle.id]
  client_id integer [not null, ref: > client.id]
  received_at timestamp
  completed_at timestamp
  returned_at timestamp
  description text
}

Table mechanic {
  id integer [primary key]
  name varchar [not null]
}

Table service_mechanic {
  id integer [primary key]
  mechanic_id integer [not null, ref: > mechanic.id]
  service_ticket_id integer [not null, ref: > service_ticket.id]
}

Table invoice {
  id integer [primary key]
  invoice_number varchar [not null, unique]
  service_ticket_id integer [not null, ref: > service_ticket.id]
  invoiced_at timestamp [not null]
  paid_at timestamp
}

Table part {
  id integer [primary key]
  service_ticket_id integer [ref: > service_ticket.id]
  name varchar [not null]
  price decimal
  description varchar(1000)
  ordered_at timestamp
  received_at timestamp
}
```

---

## Data normalization (0.5 hours)

- Resource: [Database Normalization](https://www.youtube.com/watch?v=GFQaEYEc8_8)

{{ MUST: add information on normalization }}

---

## Exercise: Inserting rows in Node.js (3 hours)

George has exported a list of existing clients and service tickets in a CSV file.

**Write a Node.js script that reads the provided CSV output and inserts data into your created database.**

```csv
"Name","Phone","Make","Model","Year","Reg","Service","Delivered","Completed","Returned","Mechanic","Invoice","Amount","Invoice Date","Payment Date"
"Harry Potter","07123456793","Ford","Fiesta","2012","EF12 GHI","Battery replacement","2022-01-20","2022-01-20","2022-01-21","Robert","INV005","£150","2022-01-21","2022-01-24"
"Doctor Who","07123456798","Jaguar","XF","2016","JK16 LMN","Battery replacement","2022-02-01","2022-02-01","2022-02-02","Robert","INV010","£150","2022-02-02","2022-02-06"
"James Bond","07123456796","Aston Martin","DB5","1964","HI64 JKL","Oil change","2022-01-28","2022-01-28","2022-01-29","William","INV008","£100","2022-01-29","2022-02-02"
"John Lennon","07123456789","Ford","Focus","2010","AB10 CDE","Engine repair","2022-01-10","2022-01-15","2022-01-16","Robert","INV001","£500","2022-01-16","2022-01-20"
```

## Exercise: Modeling car repair shop database tables (3 hours)

Your client is a British bloke named George. He is a no-nonsense bloke from Birmingham, UK. He runs a car repair shop and has asked you to help him migrate his paper-based system to a database. Here is the description of his business process:

```
My usual flow involves a customer calling for a repair or inquiry. I write down their name, phone number, and car details (make and model) and create a ticket with an issue description and the agreed time for them to deliver their car. Then, I can assign the ticket to a mechanic or multiple mechanics. Many mechanics can work on a car brought in for service, and each mechanic may work on many vehicles.

When a customer comes in with a car, I fill in the remaining car details (year, registration number, and VIN).

A car that is serviced may or may not need parts (e.g., adjusting a carburetor or cleaning a fuel injector nozzle does not require providing new parts). For each part, I record the part's name, price, and a brief description and take note of when I've ordered it.

Once a part is received, I write down when it was received. If the part is faulty, I might return it to the supplier.

When the repair is complete, I print out an invoice for that service. I note down the amount, assign a new invoice number, and include the date of invoicing. Once the invoice is paid, I record the date of payment.

After everything is settled, I return the car to the customer, ensuring that they are satisfied with the service provided. At this point, I mark the service ticket as completed.
```

Here is an exported list of existing service tickets in a CSV format:

```csv
"Name","Phone","Make","Model","Year","Reg","Description","Delivered","Completed","Returned","Mechanics","Invoice","Amount","Invoice Date","Payment Date"
"Harry Potter","07123456793","Ford","Fiesta","2012","EF12 GHI","Battery replacement","2022-01-20","2022-01-20","2022-01-21","Robert","INV005","£150","2022-01-21","2022-01-24"
"Doctor Who","07123456798","Jaguar","XF","2016","JK16 LMN","Battery replacement","2022-02-01","2022-02-01","2022-02-02","Robert","INV010","£150","2022-02-02","2022-02-06"
"James Bond","07123456796","Aston Martin","DB5","1964","HI64 JKL","Oil change","2022-01-28","2022-01-28","2022-01-29","William","INV008","£100","2022-01-29","2022-02-02"
"John Lennon","07123456789","Ford","Focus","2010","AB10 CDE","Engine repair","2022-01-10","2022-01-15","2022-01-16","Robert,William","INV001","£500","2022-01-16","2022-01-20"
```

Task: **Create an Entity Relationship Diagram (ERD) for the database.**

**[Possible solution](https://dbdiagram.io/d/6509904702bd1c4a5edb0261)**.

**Note on naming tables:** It matters little whether you name your tables in a singular or a plural form. While there are some slight pros/cons of using one over the other, most of the time, it's just a matter of a convention within your team/company. The important thing is to be consistent within a database.

**Note on dates:** Sometimes, we could choose to use a `date` over a `timestamp`. For example, `completed_at` could be `date` instead of `timestamp`. However, if we are developing an application, it is often helpful to have the exact time. For example, we should sort service tickets by the time they are received. We prefer to store data in a "greedy" manner where we are at risk of capturing too much data rather than too little. If we get this wrong, it is always possible to narrow down the data later on (`timestamp` -> `date`), but it is not possible to add data that was not stored (`date` -> `timestamp`).

<!--
## Connecting to a database in Node.js (1 hour)

There are three main ways of interacting with a database in Node:

- using low-level libraries, such as `sqlite3` or `better-sqlite3`,
- using a query builder, such as `knex` or `kysely`,
- using an ORM (Object-Relational Mapper), such as `sequelize`, `prisma` or `typeorm`.

We will start off with the low-level library `better-sqlite3` as we want to practice the SQL syntax. Later on, we will learn how to deal with abstractions over raw SQL queries.
-->

---

## Optional Bonus Exercise: Inserting rows in Node.js (3 hours)

**Write a Node.js script that inserts the given records into your created database.**

```csv
"Name","Phone","Make","Model","Year","Reg","Description","Delivered","Completed","Returned","Mechanics","Invoice","Amount","Invoice Date","Payment Date"
"Harry Potter","07123456793","Ford","Fiesta","2012","EF12 GHI","Battery replacement","2022-01-20","2022-01-20","2022-01-21","Robert","INV005","£150","2022-01-21","2022-01-24"
"Doctor Who","07123456798","Jaguar","XF","2016","JK16 LMN","Battery replacement","2022-02-01","2022-02-01","2022-02-02","Robert","INV010","£150","2022-02-02","2022-02-06"
"James Bond","07123456796","Aston Martin","DB5","1964","HI64 JKL","Oil change","2022-01-28","2022-01-28","2022-01-29","William","INV008","£100","2022-01-29","2022-02-02"
"John Lennon","07123456789","Ford","Focus","2010","AB10 CDE","Engine repair","2022-01-10","2022-01-15","2022-01-16","Robert,William","INV001","£500","2022-01-16","2022-01-20"
```

---

# Directions for further research

- Are there any cases where you should denormalize your database?
