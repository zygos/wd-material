type User = {
  id: number
  firstName: string
  username: string
  password: string
}

type UserPublic = Omit<User, 'password'>

const getUserFromDatabase = (): User => ({
  id: 1,
  firstName: 'John',
  username: 'john',
  password: 'secret!',
})

const getUserPublic = () => {
  const user: UserPublic = getUserFromDatabase()

  /* ... */
  /* ... */
  /* ... */
  /* ... */
  /* ... */

  /* ... */
  /* ... */
  /* ... */
  /* ... */
  /* ... */
  /* ... */
  /* ... */
  /* ... */

  /* ... */
  /* ... */

  /* ... */
  /* ... */
  /* ... */
  /* ... */
  /* ... */
  /* ... */
  /* ... */
  /* ... */

  return user
}

const printUser = () => {
  const user = getUserPublic()

  // if (typeof user.password !== 'undefined') {
  //   return removePassword(user)
  // }

  console.log(user)

  return user
}

const removePassword = x => x

printUser()
