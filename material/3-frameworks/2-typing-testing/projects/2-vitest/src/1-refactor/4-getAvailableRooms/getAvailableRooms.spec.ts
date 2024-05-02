import { expect, it } from 'vitest'
import getAvailableRooms from '.'

it('should return remaining available rooms', () => {
  // arrange
  const rooms = [
    { id: 1, name: 'Room 1' },
    { id: 2, name: 'Room 2' },
    { id: 3, name: 'Room 3' },
    { id: 4, name: 'Room 4' },
  ]
  const bookings = [{ roomId: 1 }, { id: 2, roomId: 4 }]

  // act
  const result = getAvailableRooms(rooms, bookings)

  // assert
  expect(result).toEqual([
    { id: 2, name: 'Room 2' },
    { id: 3, name: 'Room 3' },
  ])
})
