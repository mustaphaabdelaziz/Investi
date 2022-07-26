var timeout = null;
function getSpeaker(event, index) {
  // Clear the timeout while the user still typing
  clearTimeout(timeout);
  var input, filter, result, id, listID;
  id = event.id;
  // console.log("input id:", id);
  input = document.getElementById(id);
  result = input.nextElementSibling;
  // listID = "list" + index;
  // console.log("listID:", result);
  // result = document.getElementById(listID);
  // ul.appendChild(document.createNode("li"));
  // console.log("ul id:",ul);
  let url = localURL || serverURL;
  // when the user stop typing wait 2 seconds before sending the request
  timeout = setTimeout(() => {
    filter = input.value;
    url = url + "/user/speaker/filter?name=" + filter;
    // console.log(url);
    // console.log(filter);
    axios
      .get(url)
      .then(function (response) {
        // console.log(response);
        if (response.data.length>0) {
          let items = response.data.map((data) => createSpeakerItem(data)).join("");
          result.innerHTML = items;
        }else{
          result.innerHTML ='<span class = "p-2">No Results found</span>';
        }
        // console.log(data);
        // let li = createItem(data);
        // ul.appendChild(li);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, 1000);
}
function createSpeakerItem(speaker) {
  return `<div class="container">
            <div class="d-flex flex-row justify-content-start align-items-center">
              <div class="ms-2">
              <input class="form-check-input" type="radio" name="speakerId" id="${speaker._id}" value="${speaker._id}">
              <label class="form-check-label" for="${speaker._id}">${speaker.fullname}</label>
              </div>
              <div class="ms-2">
              <img class="rounded-circle" width="40" height="40" src="${speaker.pictures[0].url}" alt="${speaker.fullname}">
              </div>
            </div>
        </div>`;
}
