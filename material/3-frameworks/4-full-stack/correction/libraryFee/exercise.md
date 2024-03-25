**Library Late Fees**

Write a function for a library system that calculates late fees for a list of books. It takes in an array of objects. Each object is a representation of loaned book. Each object contains 2 properties:

- checkoutDate - the date the book was checked out
- returnedDate - the date the book was returned

The fee depends on the number of days the book was checked out.

- The first five days are free.
- Next five days are 25 cents per day.
- After that, 50 cents per day.

The function should return the total fee for all the books.

Propose using Date objects or strings for date representation.

- If using Date objects, days should be rounded up.
- If using strings, the dates need to be validated.
