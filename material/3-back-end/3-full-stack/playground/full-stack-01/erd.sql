-- not actually SQL, but it provides decent syntax highlighter
Table project {
  id integer [primary key]
  name text [not null]
  user_id integer [not null, ref: > user.id]
}

Table bug {
  id integer [primary key]
  name text [not null]
  message text [not null]
  stacktrace text [not null]
  environment text [not null]
  status int [not null]
  assigned_to integer [ref: > user.id]
  project_id integer [not null, ref: > project.id]
}

Table user {
  id integer [primary key]
  email text [not null] -- this might be null if user is created using 3rd party login (google, facebook, github, etc)
  password text [not null]
  role int [not null]
}
