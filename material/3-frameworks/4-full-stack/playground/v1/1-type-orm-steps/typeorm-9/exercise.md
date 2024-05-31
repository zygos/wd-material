Throw out existing entities and create a new schema for a bare-bones bug tracking application.

This will be a very simple bug tracking application, similar to Sentry or Bugsnag.

User can have many projects and a project can have many bugs.

A bug belongs to a single project and a project belongs to a single user.

```sql
-- not SQL, just for syntax highlighting
-- More details and a diagram here:
-- https://dbdiagram.io/d/654a9dbc7d8bbd6465b36138
-- The diagram will help you figure out the relationship types.

Table user {
  id integer [primary key]
  email text [not null, unique]
  password text [not null]
}

Table project {
  id integer [primary key]
  name text [not null]
  user_id integer [not null, ref: > user.id]
}

Table bug {
  id integer [primary key]
  project_id integer [not null, ref: > project.id]
  name text [not null]
  message text
  code text
  stacktrace text
}
```

There is no need to implement add any cascades.

## Tests

Your schema does not need to start off with tests. In general, we would recommend writing tests when you have some behaviour that you want to implement. Writing tests that only check that you the thing you wrote is the thing you wrote is not the best use of your time. We would be mostly testing the TypeORM library, not our code.

We will come back to tests when we start using this small schema in an application.
