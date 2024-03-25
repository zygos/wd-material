import { getAvailableRooms } from '.'

describe('getAvailableRooms', () => {
  it('should return available rooms', () => {
    // setup
    const rooms = [
      { id: 1, name: 'Room 1' },
      { id: 2, name: 'Room 2' },
      { id: 3, name: 'Room 3' },
      { id: 4, name: 'Room 4' },
    ]
    const bookings = [
      { id: 1, roomId: 1 },
      { id: 2, roomId: 2 },
    ]

    // action
    const result = getAvailableRooms(rooms, bookings)

    // expectation
    expect(result).toEqual([
      { id: 3, name: 'Room 3' },
      { id: 4, name: 'Room 4' },
    ])
  })
})
