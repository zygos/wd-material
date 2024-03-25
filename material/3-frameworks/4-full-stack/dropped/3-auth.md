Let's consider an example - Turing College. Turing College, allows peer corrections. Learners can review and grade each other's projects. Let's say we have two learners - John and Mary. In this case, John is the reviewer and Mary is the learner.

Mary and John can visit the calendar page, which performs a request to the back end:

```json
// for clarity, we will use string IDs for learners instead of numbers
GET /api/correction
[
  {
    "id": 123,
    "learnerId": "mary",
    "reviewerId": "john",
    "status": "pending",
    "grade": null
  }
]
```

John grades Mary's project using a form in the web app, clicks submit. That form performs a request to the server:

```json
PATCH /api/correction/123
{
  "status": "fail",
  "grade": 62
}
```

The server receives the request, and updates the database.

But let's say Mary is a bit more tech-savvy. She has done a few peer corrections herself and before submitting a review for another student, she opens the developer tools and looks at the network tab. She sees the request that is being sent to the server and copies it. She also crawl through the front-end source code and likely find out what requests should be done where to perform the necessary changes.

She opens up her calendar and sees in the network tab that her correction with John has the id 123.

Now, she knows everything she needs to know to grade her own project. She sets the id in the request and sends it to the server using some API client (Insomnia, Postman, etc.) or she could open up the console in the browser and send the request using JavaScript.

```json
PATCH /api/correction/123
{
  "status": "success",
  "grade": 100
}
```

Now, she would be grading her own project. That should not be allowed. How can we make sure that only the reviewer can grade the project?

We would like to know who is sending the request to the server. Then, we could have some logic, which would check if the user is allowed to grade the project:

```js
// request handler
if (userLoggedIn.id !== correction.reviewerId) {
  throw new Error('You are not allowed to grade this project');
}

await db.getRepository(Correction).update(/* ... */);
```

Let's just attach the user id to every request, for example in the request headers that are sent to the server together with the JSON request body.

```json
PATCH /api/correction/123
Authentication: "UserId john"
{
  ...
}
```

Would that work? No, because Mary can just set the same header in her request.

**Basic authentication**

We need to add something to our request that only the reviewer knows. For example, we could add their password. Then, the server could check if the password is correct and only then allow the request to go through.

```json
PATCH /api/correction/123
Authentication: "Basic john:secretpassword"
{
  ...
}
```

This is called basic authentication. We are sending the user id and password with our request. The server checks if the password is correct and only then allows the request to go through. A real implementation of this would use `base64` to encode the `username:password`. Base64 is not encryption, it is just a way to encode binary data into a string of characters. You could see how it works [here](https://www.base64encode.org/). You can encode anything in base64 in your browser with `btoa` function which is available in the console. For Node.js, you would need to deal with `Buffer` objects to encode/decode base64.

This is used for some basic APIs, but it is not considered a good option for any web app. Why?

We would not prompt the user for their password every time they want to send a request to the server. We might store it in memory as a JavaScript variable, which we would send it with every request. But that would require us to ask for the password every time the page is refreshed. We could use local storage, but that is also a bad idea. If our user has a malicious extension installed, it could read the password from the local storage and send it to a 3rd party server. Also, many users tend not to follow the best practices of using a different password for every service. If someone gets access to the password, they could use it to log in to other apps.

**Note:** we are not even touching the topic of encryption. If our server does not enforce HTTPS, then the password is sent in plain text and anyone snooping on the network could read it.

**Sessions**

What if instead of sending username and password every time, we send them once on login and then we remember on the server that the user is logged in?

In the back-end, we could accept username and password and return some generated random-ish string of characters that would be extremely hard to guess. Then, we would demand to get back the same string of characters with every request. So, we are keeping some sort of mapping between the secret string of characters and user ids:

```
abc123... => john
def456... => mary
ghi789... => mary (if she logs in from another device)
```

After some time passes or the user calls some provided logout endpoint, we would delete the mapping for their user id and they would need to log in again.

This general approach is called a session.

For the user to provide the session id, they would need to store it somewhere. Where could they put it?

We could store it in `localStorage`. Then, we would add it as a header to every request. However, the most common method of storing the session id is in a cookie.

**Cookies**

Cookies are a client-side storage mechanism, similar to localStorage. There are a few differences:

- Clients, such as browsers, can be instructed to set the cookie from the server side. Server in response to a successful login can send a header `Set-Cookie` with the value of the cookie, which contains the session id. Local storage can only be set from the front-end via JavaScript.
- Cookies are automatically sent with every request to the same domain. Local storage is not sent with every request. If we want to send something from local storage, we need to do it get it and add it to the request manually.
- Cookies can be made to be `httpOnly`, which means that they cannot be read or accessed via JavaScript.

This directly maps to 2 pros/cons of cookies:

- Con. Since they are sent with every request automatically, someone else could try to impersonate user actions by calling our API. This is called CSRF (Cross-Site Request Forgery) attack.
- Pro. Since these cookies can not be accessed via JavaScript, even if user is tricked into running some malicious JavaScript code, the attacker would not be able to get the session id.

An Express server could set a cookie on login:

```js
// pseudo-code
const sessionId = generateRandomSessionId()
sessions.set(sessionId, userId)

res.cookie('session-id', sessionId, { httpOnly: true })
```

The browser would then save the cookie and send it with every request to the same domain.

**JSON Web Tokens**

One issue with sessions is that our server needs to manage them.

- If we store session data in-memory, then if the server crashes, all the users would be logged out. Also, this would not work if we have multiple machines.
- If we store session data in a SQL database, then we would need to query the database on every request to check if the session id is valid. That is not very efficient.
- We could use a performant key-value database, such as Redis, but that would be an additional dependency which we would need to manage and it introduces additional complexity.

Ideally, we would like to be able to trust that the user provided their details without tampering with them. How could we do that?

Let's remember our initial naive approach:

```json
PATCH /api/correction/123
Authentication: "UserId john"
{
  ...
}
```

What if we could somehow trust that the provided user id is truly the user id of the user who is sending the request? What if instead of providing the session id, we would provide some string of characters that would work as a stamp of approval that we have already checked that the user is who they say they are?

We would need:
1. Some secret string of characters that only our server knows.
2. A function that encrypts the provided user id using the secret string of characters.
3. A function that can

If we had a function that could the same operation in reverse, we could then demand for all requests to provide this unique secret string of characters and we would check if that secret string of characters is valid for the provided user id.

We could then provide this unique secret string of characters to the user when they log in. Then, we would not need to store anything in our database.

By convention, this unique secret string of characters is called a token and it is sent either in the request headers, either by explicitly adding it to headers or implicitly by using cookies.

```json
PATCH /api/correction/123
Authentication: "Bearer eyJhbG..."
{
  ...
}
```

One particular method we will use is called JSON Web Tokens (JWTs). It is a standard for creating tokens that can be verified by the server.

---

Here is an example of how some Discord users were tricked into [running malicious JS code](https://www.youtube.com/watch?v=0emiy4TxV7A), which allowed the attacker to steal their Discord tokens that are stored in localStorage.
