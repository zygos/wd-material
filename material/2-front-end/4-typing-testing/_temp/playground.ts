function getDaysLeft(date, deadline) {
  return (deadline.getDate() - date.getDate()).toString();
}

console.log(getDaysLeft(new Date(), new Date()));
