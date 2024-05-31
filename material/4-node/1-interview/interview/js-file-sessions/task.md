### Live Coding Exercise: Implement a File-based Session Store for a Node.js Application

#### Scenario:
In many web applications, session management is a crucial aspect for maintaining user state between HTTP requests. A common approach is to store session information either in memory or in a database. However, for this exercise, you are to implement a simple file-based session store in Node.js. This store will manage user sessions by reading from and writing to the filesystem. This is a practical exercise to test your understanding of asynchronous file operations in Node.js, error handling, and basic data management.

#### Requirements:
1. **Create a Session Store Class**:
  - The class should be named `FileSessionStore`.
  - It should have methods to `load`, `save`, and `delete` sessions.
  - Sessions should be stored as JSON files in a specified directory.

2. **Session Management**:
  - Each session should be represented as a file in a directory. The file name should be the session ID.
  - The content of each session file should be JSON serialized data of the session object.

3. **Methods to Implement**:
  - `getSession(sessionId: string): Promise<any>`: This method should read the session file, parse the JSON content and return
  - `saveSession(sessionId: string, sessionData: any): Promise<void>`: This method should write the session data to a file with the session ID as the file name
  - `deleteSession(sessionId: string): Promise<void>`: This method should delete the session file corresponding to the session ID
