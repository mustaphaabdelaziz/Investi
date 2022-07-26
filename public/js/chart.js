const ctx = document.getElementById("myChart");
Chart.defaults.font.size = 16;
titles = [];
views = [];
participants = [];
companies = [];
keys = ["views", "attandance", "companies"];
for (let event of events) {
  titles.push(event.title);
  views.push(event.views);
  participants.push(participants.length);
  companies.push(companies.length);
}
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: titles,
    datasets: [
      {
        label: "views",
        data: views,
        backgroundColor: [
          //   "rgba(255, 99, 132, 0.2)"
          //   "rgba(54, 162, 235, 0.2)",
          //   "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          //   "rgba(153, 102, 255, 0.2)",
          //   "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          //   "rgba(255, 99, 132, 1)",
          //   "rgba(54, 162, 235, 1)",
          //   "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          //   "rgba(153, 102, 255, 1)",
          //   "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: "participants",
        data: participants,
        backgroundColor: [
          //   "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          //   "rgba(255, 206, 86, 0.2)",
          //   "rgba(75, 192, 192, 0.2)",
          //   "rgba(153, 102, 255, 0.2)",
          //   "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          //   "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          //   "rgba(255, 206, 86, 1)",
          //   "rgba(75, 192, 192, 1)",
          //   "rgba(153, 102, 255, 1)",
          //   "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: "Companies",
        data: companies,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          //   "rgba(54, 162, 235, 0.2)",
          //   "rgba(255, 206, 86, 0.2)",
          //   "rgba(75, 192, 192, 0.2)",
          //   "rgba(153, 102, 255, 0.2)",
          //   "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          //   "rgba(54, 162, 235, 1)",
          //   "rgba(255, 206, 86, 1)",
          //   "rgba(75, 192, 192, 1)",
          //   "rgba(153, 102, 255, 1)",
          //   "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Events Statistics",
        position: "bottom",
        font: {
          size: 30,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
