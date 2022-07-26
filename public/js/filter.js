// $(function () {
//   $("#category").on("click", function () {
//     console.log($(this).text()+":clicked");
//   });
// });
function filter(base) {
  // console.log(base);
  axios
    .get("http://localhost:9999/events/filter?category=" + base)
    .then(function (response) {
      // handle success
      for (const res in response.data) {
        // console.log(res);
      }
      // console.log(response.data[0].title);
      // console.log(MyEvents);
      MyEvents = response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}
