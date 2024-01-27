export function getAvailableRooms(rooms, bookings) {
  const availableRooms = []
  for (let i = 0; i < rooms.length; i++) {
    let isBooked = false
    for (let j = 0; j < bookings.length; j++) {
      if (bookings[j].roomId === rooms[i].id) {
        isBooked = true
        break
      }
    }
    if (!isBooked) {
      availableRooms.push(rooms[i])
    }
  }
  return availableRooms
}
