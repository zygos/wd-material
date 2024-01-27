SELECT *
FROM people pe, bank_accounts ba
WHERE ba.person_id = pe.id;

SELECT *
FROM people pe
JOIN bank_accounts ba ON ba.person_id = pe.id;

---

EXPLAIN SELECT STRAIGHT_JOIN *
FROM bank_accounts ba
CROSS JOIN people pe ON ba.person_id = pe.id
JOIN atm_transactions atm ON atm.account_number = ba.account_number;

EXPLAIN SELECT STRAIGHT_JOIN *
FROM bank_accounts ba, people pe
JOIN atm_transactions atm ON atm.account_number = account_number -- ba.account_number does not work
WHERE ba.person_id = pe.id;

SELECT *
FROM bank_accounts ba, people pe
JOIN atm_transactions atm ON atm.account_number = account_number -- ba.account_number does not work
WHERE ba.person_id = pe.id;

SELECT *
FROM people pe, bank_accounts ba
JOIN atm_transactions atm ON atm.account_number = ba.account_number -- only ba.account_number works
WHERE ba.person_id = pe.id;

SHOW WARNINGS;

EXPLAIN SELECT STRAIGHT_JOIN *
FROM people pe, bank_accounts ba
JOIN atm_transactions atm ON atm.account_number = ba.account_number -- only ba.account_number works
WHERE ba.person_id = pe.id;

EXPLAIN SELECT STRAIGHT_JOIN *
FROM people pe
CROSS JOIN bank_accounts ba ON ba.person_id = pe.id
JOIN atm_transactions atm ON atm.account_number = ba.account_number;

EXPLAIN SELECT STRAIGHT_JOIN *
FROM people pe
LEFT JOIN bank_accounts ba ON ba.person_id = pe.id
LEFT JOIN atm_transactions atm ON atm.account_number = ba.account_number;

SELECT *
FROM people pe, bank_accounts ba
WHERE pe.id *= ba.person_id;

```

Hi!

Yes, not particularly happy about this question. It has multiple issues.

It was meant to ask what will be the left table in statement with a single join (including an implicit join, so that's why the possibility of multiple tables in `FROM` was mentioned). So:

```sql
SELECT *
FROM people pe, bank_accounts ba
WHERE ba.person_id = pe.id;
```

```sql
SELECT *
FROM people pe
JOIN bank_accounts ba ON ba.person_id = pe.id;
```

In both cases `people` is the left table.

You are correct that with multiple joins it no longer holds, as `bank_accounts` is the right table to the `people` table, and it is left for `atm_transactions`.

I think the question in itself is quite ambigous and would require a very precise/verbose answer, because even a good option like yours, while definitely better, leaves some room for ambiguity.

"""
The left table is one of the tables before the JOIN statement and referenced in one of the columns of the ON statement.
"""

If we are not taking `JOIN` in the question literally, then it does not answer which is the left table in an implicit join:

```sql
SELECT *
FROM people pe, bank_accounts ba
WHERE ba.person_id = pe.id;
```

Or if we are taking the presence of `JOIN` in the question literally, then we would need to take presence of `ON` keyword in the answer literally as well and then we could write a query with a `JOIN` and no `ON` statement:

```sql
SELECT *
FROM bank_accounts
JOIN atm_transactions USING (account_number);
```

I think I'll rephrase the question and change a few options. Thanks a lot!
















--- --- ---

-- Right now, in both statements, bank_accounts is a right table in a join with people
-- and it is LEFT for atm_transactions, so for multiple tables it can be ambigious. The idea
-- was that the first table will always be LEFT.

-- Answer suggestion:
-- FROM with multiple columns is a CROSS JOIN, so left table does not have to be one of the tables before the JOIN statement.

-- It would be better to call what is the left-most table in a SQL statement, which is the first
-- table in FROM clause.

--- --- ---

-- It was meant to cover single joins, so

```sql
SELECT *
FROM people pe, bank_accounts ba
WHERE ba.person_id = pe.id;
```

and

```sql
SELECT *
FROM people pe
JOIN bank_accounts ba ON ba.person_id = pe.id;
```

---

Some demo data:

-- Language: sql

INSERT INTO people (id, name, age) VALUES
(1, 'John', 20),
(2, 'Jane', 30),
(3, 'Bob', 40),
(4, 'Ana', 40),
(6, 'Tom', 40),
(8, 'Jessica', 40);

INSERT INTO bank_accounts (id, person_id, account_number) VALUES
(4, 4, '111111111'),
(5, 5, '222222222');

(1, 1, '123456789'),
(2, 2, '987654321'),
(3, 3, '123123123'),

INSERT INTO atm_transactions (id, account_number, amount) VALUES
(7, 9, '222222222'),
(4, '412421312', 300),
(1, '123456789', 100),
(2, '987654321', 200),
(3, '123123123', 300);

INSERT INTO random (id, account_number, user_id) VALUES
(8, 8, '222222222');

--- Create tables

CREATE TABLE people (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  age INT
);

CREATE TABLE bank_accounts (
  id INT PRIMARY KEY,
  person_id INT,
  account_number VARCHAR(255)
);

CREATE TABLE atm_transactions (
  id INT PRIMARY KEY,
  account_number VARCHAR(255),
  amount INT
);

CREATE TABLE random (
  id INT PRIMARY KEY,
  account_number VARCHAR(255),
  user_id INT
);
