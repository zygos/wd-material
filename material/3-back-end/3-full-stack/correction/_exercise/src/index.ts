// takes 2 arguments
// 1. current date, 2. an array of dates
// each dates are the checkoutdates
// first 5 days 25 cents any additional days are 50 cents

const DAY_MS = 24 * 60 * 60 * 1000

const RATE_REGULAR = 0.25
const RATE_PREMIUM = 0.5

export function feeCalculatorAlt(returnDate: Date, checkoutDates: Date[]) {
  return checkoutDates
    .map((checkoutDate) => {
      const difference = returnDate.getTime() - checkoutDate.getTime()
      const days = Math.ceil(difference / DAY_MS)

      const daysCheap = Math.min(days, 5)
      const daysPremium = Math.max(days - 5, 0)

      return daysCheap * RATE_REGULAR + daysPremium * RATE_PREMIUM
    })
    .reduce(sum, 0)
}

const sum = (a: number, b: number) => a + b

export function feeCalculator(returnDate: Date, checkoutdates: Date[]) {
  let fee = 0
  const [year, month, day] = dateToNumbers(returnDate)

  checkoutdates.forEach((datee) => {
    let difference = 0

    const [yearr, monthh, dayy] = dateToNumbers(datee)

    difference += (year - yearr) * 365
    difference += (month - monthh) * 30
    difference += (day - dayy) * 1

    let i = 0

    while (i < difference) {
      if (i < 5) {
        fee += 0.25
      } else {
        fee += 0.5
      }
      i += 1
    }
  })
  return fee
}

function dateToNumbers(dateToBeModified: Date) {
  const [returnsDate] = dateToBeModified
    .toISOString()
    .split('T')

  return returnsDate
    .split('-')
    .map(numeric => parseInt(numeric, 10)) as [number, number, number]
}
