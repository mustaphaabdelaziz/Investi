var duration = document.getElementById("duration");

// setInterval(() => {
//   duration.innerText = moment()
//     .countdown(
//       "2021-10-1",
//       countdown.MONTHS |
//         countdown.DAYS |
//         countdown.HOURS |
//         countdown.MINUTES |
//         countdown.SECONDS
//     )
//     .toString();
// }, 1000);
var period = countdown("2021-10-1", countdown.DAYS);
var now = moment()
duration.textContent = period;