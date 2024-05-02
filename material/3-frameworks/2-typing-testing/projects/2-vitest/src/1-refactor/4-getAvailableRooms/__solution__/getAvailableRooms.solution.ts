type Room = {
  id: number
  name: string
}

type Booking = {
  id: number
  roomId: number
}

export default (rooms: Room[], bookings: Booking[]) => {
  // we could use a Set here if we expected a lot of bookings
  const bookedIds = bookings.map((booking) => booking.roomId)

  // we could also use .some but .includes allows to
  // avoid nesting functions which is more readable
  return rooms.filter((room) => !bookedIds.includes(room.id))
}

// we could also use Pick<Booking, 'roomId'>[] for our bookings as
// no other property is necessary for our function. This would allow
// us to work with a smaller type and, in some cases, avoid errors.
