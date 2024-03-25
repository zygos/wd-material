import type { Comment } from './types'

/**
 * Given a list of comments, returns the comments that were created
 * in the last month, week and day. Uses rolling 1, 7 and 30 day windows.
 * @returns an object with the comments created in the last month, week and day.
 */
export function getRecentComments(comments: Comment[]) {
  // for this example we can assume 30 days in a month
  const lastMonth = new Date()
  lastMonth.setDate(lastMonth.getDate() - 30)

  const lastMonthComments = comments.filter(
    (comment) => comment.createdAt > lastMonth,
  )

  const lastWeek = new Date()
  lastWeek.setDate(lastWeek.getDate() - 7)

  const lastWeekComments = lastMonthComments.filter(
    (comment) => comment.createdAt > lastWeek,
  )

  const lastDay = new Date()
  lastDay.setDate(lastDay.getDate() - 1)

  const lastDayComments = lastWeekComments.filter(
    (comment) => comment.createdAt > lastDay,
  )

  return {
    lastMonthComments,
    lastWeekComments,
    lastDayComments,
  }
}

// TODO: while the function above is fine, it can be made easier
// to understand by using moving the date creation and comparison
// to a separate function. Refactor the function above to use a
// new function `sinceDaysAgo`, which can be used in the following way:
export function getRecentComments2(comments: Comment[]) {
  const lastMonthComments = comments.filter(sinceDaysAgo(30))
  const lastWeekComments = lastMonthComments.filter(sinceDaysAgo(7))
  const lastDayComments = lastWeekComments.filter(sinceDaysAgo(1))

  return {
    lastMonthComments,
    lastWeekComments,
    lastDayComments,
  }
}

// TODO: Write a function which encapsulates all the logic for
// creating a date and comparing it to a given number of days ago.
function sinceDaysAgo(daysAgo: number) {
  // This function might need to produce a new function
}
