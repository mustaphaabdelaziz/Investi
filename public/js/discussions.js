function post() {
 let content = document.getElementById('content');
 let pictures = document.getElementById('pictures');
 // console.log("description", content.value);
 // console.log("pictures", pictures.files);
 var data = new FormData()
 for (const file of pictures.files) {
  data.append('files', file)
  // console.log("file",file)
 }

 url = localURL || serverURL;
 url = url + "/events/" + eventId + "/discussion/";
 fetch(url, {
  method: 'POST', // or 'PUT'
  headers: {
   'Content-Type': 'application/json',
  },
  body: JSON.stringify({
   content: content.value,
   pictures: data
  }),
 }).then(response => response.json()).then(data => {
  // console.log('Success:', data);
 }).catch((error) => {
  console.error('Error:', error);
 });
}