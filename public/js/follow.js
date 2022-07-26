// those are coming from the profile page
let follwedUserId = followedUser._id;
let userId = user._id;
// the localURL variable is in .env file and is just local and it won't be added to the deployed site
// so the serverURL is added to the deployed site so it will be taken
let url = localURL || serverURL;
// let url = localURL;
// console.log("URL:", url);

if (user) {
  // console.log(followedUser.userType);
  if (followedUser.userType === "user") {
    url = url + "/user/" + userId + "/follow";
    // console.log("Sending... to:", url);
  } else {
    url = url + "/company/" + userId + "/follow";
    // console.log("Sending... to:", url);
  }
  let follow = false;
  $(function () {
    $("#follow").on("click", function () {
      if ($(this).text() === "Follow") {
        follow = true;
        // console.log("text equal to Follow");
        $(this).text("Following");
      } else {
        // console.log("text equal to Following");
        follow = false;
        $(this).text("Follow");
      }
      axios
        .post(url, {
          follow,
          userId,
          follwedUserId,
        })
        .then(function (response) {
          // console.log(response.status);
          $("#followers").text(response.data.nbrFollowers);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  });
}
