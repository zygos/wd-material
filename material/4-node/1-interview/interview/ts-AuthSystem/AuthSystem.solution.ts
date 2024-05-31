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
*/

type User = {
  email: string;
  password: string;
}

class AuthSystem {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  register(email: string, password: string): void {
    if (password.length < 8 || password.length > 32) {
      throw new Error('Password must be between 8 and 32 characters');
    }

    // something basic, what a learner could come up with
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

  getUsers(): User[] {
    return Object.values(this.users);
  }

  hashPassword(password: string) {
    return password.toUpperCase();
  }
}
