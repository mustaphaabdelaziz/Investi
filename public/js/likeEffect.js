const likes = document.getElementById("likesCounts");
async function liked(elementId) {
  const url =
    "http://localhost:3000/events/" + elementId + "/likes";
  var element = document.getElementById(elementId);
  var value = element.classList.toggle("liked");
  // console.log(value);
 
  await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value: value,
    }),
  })
    .then(function (data) {
      // console.log(data);
       if (value) {
         likes.innerText = parseInt("likes.textContent") + 1;
        }else{
         likes.innerText = parseInt("likes.textContent") - 1;

       }
    })
    .catch(function (err) {
      console.log(err);
    });
}
