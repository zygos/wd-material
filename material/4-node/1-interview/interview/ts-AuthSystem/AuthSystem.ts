/**
 * We will mimick an authentication system with a simple class.
 *
 * Tasks:
 * 1. Some users sign up with very weak passwords. Please validate the password length,
 *    so it has to be between 8 and 32 characters.
 * 2. Validate the email format.
 * 3. It seems that the current data structure for storing users is not the best for heavy read
 *    operations. How would you change it?
 * 4. Pretend that you have some hashing function (you can create a new function that performs
 *    any string manipulation). How would you adapt the AuthSystem to use it?
 *
 * --- --- ---
 * Passing: 3/4 tasks done.
*/

type User = {
  email: string;
  password: string;
}

class AuthSystem {
  private users: User[];

  constructor() {
    this.users = [];
  }

  register(email: string, password: string): void {
    this.users.push({ email, password });
  }

  login(email: string, password: string): boolean {
    return this.users.some(user => user.email === email && user.password === password);
  }

  getUsers(): User[] {
    return this.users;
  }
}
