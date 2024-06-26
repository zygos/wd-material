/**
 * We will mimick an authentication system with a simple class.
 *
 * Tasks:
 * 1. Some users sign up with very weak passwords. Please validate the password length,
 *    so it has to be between 8 and 32 characters. If the password is invalid, throw an error.
 * 2. Ensure that the email is unique when registering a new user. If the email is already
 *    in use, throw an error.
 * 3. Some users try to register by passing an improperly formatted email. Could we validate
 *    its general structure? If the email is invalid, throw an error.
 * 4. It seems that the current data structure for storing users is not the best for heavy read
 *    operations. How would you change it?
 * 5. Pretend that you have some hashing function (you can create a new function that
 *    performs any string manipulation). How would you adapt the AuthSystem to use it?
 *
 * --- --- ---
 * Passing (70% - 80%): 3/5 tasks done.
 * 80 - 90% - 4/5 tasks done.
 * 90% - 100% - 5/5 tasks done.
*/

type User = {
  email: string;
  password: string;
}

class AuthSystem {
  private users: Map<string, User>;

  constructor() {
    // alternative - plain object {}
    this.users = new Map();
  }

  register(email: string, password: string): void {
    if (password.length < 8 || password.length > 32) {
      throw new Error('Password must be between 8 and 32 characters');
    }

    // Something simple, what a learner could come up with.
    // Alternatively, this could be a function with a few checks for '@'
    // and '.' in the email string, which is not sufficient for a real-world
    // application, but fine to test the learner's understanding of string
    // operations.
    if (!/\w+@\w+\.\w+/.test(email)) {
      throw new Error('Invalid email format');
    }

    const passwordHash = this.hashPassword(password);

    this.users.set(email, { email, password: passwordHash });
  }

  login(email: string, password: string): boolean {
    const passwordHash = this.hashPassword(password);
    const user = this.users.get(email);

    if (!user) return false;

    return user.password === passwordHash;
  }

  hashPassword(password: string) {
    return password.toUpperCase();
  }
}
