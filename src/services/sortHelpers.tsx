// const weekDays = ["Sun", "Tue", "Mon", "Thu", "Wed", "Sat", "Fri"]

// const trucks = [
//   { day: "Mon", driver: "Joe" },
//   { day: "Tue", driver: "Eric" },
//   { day: "Wed", driver: "Ross" },
//   { day: "Fri", driver: "James" },
//   { day: "Sun", driver: "Lawrence" },
//   { day: "Thu", driver: "Juan" },
//   { day: "Sat", driver: "Angel" },
// ]

export const sortByDay = (firstEl, secondEl) => {
  let firstVal
  let secondVal

  switch (firstEl.day) {
    case "Mon":
      firstVal = 1
      break
    case "Tue":
      firstVal = 2
      break
    case "Wed":
      firstVal = 3
      break
    case "Thu":
      firstVal = 4
      break
    case "Fri":
      firstVal = 5
      break
    case "Sat":
      firstVal = 6
      break
    case "Sun":
      firstVal = 7
      break

    default:
      firstVal = 0
  }

  switch (secondEl.day) {
    case "Mon":
      secondVal = 1
      break
    case "Tue":
      secondVal = 2
      break
    case "Wed":
      secondVal = 3
      break
    case "Thu":
      secondVal = 4
      break
    case "Fri":
      secondVal = 5
      break
    case "Sat":
      secondVal = 6
      break
    case "Sun":
      secondVal = 7
      break

    default:
      secondVal = 0
  }

  return firstVal - secondVal
}
