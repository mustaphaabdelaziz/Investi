let eventId = MyEvent._id;
let userId = user._id;
// the localURL variable is in .env file and is just local and it won't be added to the deployed site
// so the serverURL is added to the deployed site so it will be taken
let url = localURL || serverURL;
// let url = localURL;
// console.log("URL:", url);
if (user) {
  url = url + "/events/" + eventId + "/" + userId + "/";
  // console.log("Sending... to:", url);
  let attend = false;
  $(function () {
    $("#subscribe").on("click", function () {
      if ($(this).text() === "Attend") {
        attend = true;
        $(this).text("Going");
      } else {
        attend = false;
        $(this).text("Attend");
      }

      fetch(url, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attend,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Success:", data);
          // console.log("subscribers:", data.subscribers);
          // console.log("subscribers:",  $("#subscribers").text());
          $("#subscribers").text(data.subscribers);
          // console.log("after update:",  $("#subscribers").text());

        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });
}
