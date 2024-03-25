import type { Comment } from '../types'

export function getRecentComments(comments: Comment[]) {
  const lastMonthComments = comments.filter(sinceDaysAgo(30))
  const lastWeekComments = lastMonthComments.filter(sinceDaysAgo(7))
  const lastDayComments = lastWeekComments.filter(sinceDaysAgo(1))

  return {
    lastMonthComments,
    lastWeekComments,
    lastDayComments,
  }
}

function sinceDaysAgo(daysAgo: number) {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)

  return (comment: Comment) => comment.createdAt > date
}
