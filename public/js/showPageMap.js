mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  center: MyEvent.geometry.coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});
 
new mapboxgl.Marker()
  .setLngLat(MyEvent.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 10 }).setHTML(
      `<h4>${MyEvent.title}</h4><p>${MyEvent.location}</p>`
    )
  )
  .addTo(map);


