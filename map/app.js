// DOM
const recent_launch = document.querySelector(".details");
const mission_name = document.querySelector(".mission-name");
const detBtn = document.querySelector(".det-btn");
const timeline = document.querySelector(".timeline");

// **Latest**
latest_Launch();
async function latest_Launch() {
  // returns promises in Asynchronous and allow other functions to run properly before the promises are returned.
  try {
    const res = await fetch("https://api.spacexdata.com/v4/launches/latest"); //fetch latest launch api
    const data = await res.json();
    mission_name.innerHTML = data.name;
    recent_launch.innerHTML = data.details;
  } catch (err) {
    console.log(err);
  }
}
// Details button
detBtn.addEventListener("click", function () {
  document.querySelector(".launch-detail").classList.toggle("hidden");
  return detBtn.innerHTML === "Details"
    ? (detBtn.innerHTML = "Close")
    : (detBtn.innerHTML = "Details");
});

// ****MAP*****
let center = [28.6272, -80.6209];
let zoomLevel = 3;
let map;

let view = window.matchMedia("(with:200px)");
if (view.matches) {
  map = L.map("map").setView(center, zoomLevel).fitWorld(); //fit mobile phone screen
} else {
  map = L.map("map").setView(center, zoomLevel);
}
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",

    accessToken:
      "pk.eyJ1Ijoic2FpZGEyNSIsImEiOiJja2xuem4wdnUwbzBsMndwNGNyNWxwY2wwIn0.5fLWNX8N2uwiKwyjY_4vog",
  }
).addTo(map);

// ICON
var myIcon = L.icon({
  iconUrl: "/img/favicon-32x32.png",
  iconSize: [25, 30],
});
// Launch Location Object
let launch_location = [
  { name: "Kennedy Space Launch", coordinates: [28.6272, -80.6209] },
  {
    name: "Vandenberg AFB Space Launch",
    coordinates: [34.632706, -120.613393],
  },
  {
    name: " Cape Canaveral Space Launch",
    coordinates: [28.531986, -80.566821],
  },
  {
    name: " Brownsville South Texas Launch",
    coordinates: [25.9875, -97.186389],
  },
];
launch_location.forEach((el) => {
  //loop through launch object
  let cords = el.coordinates;
  var circle = L.circle(el.coordinates, {
    color: "#46639E",
    fillColor: "#9EBEFC",
    fillOpacity: 0.3,
    radius: 1000,
  }).addTo(map);
  let rocket = L.marker(cords, { icon: myIcon }).bindPopup(el.name).addTo(map);
  return rocket, circle;
});

// var circle = L.circle(launch_location, {
//   color: "#46639E",
//   fillColor: "#9EBEFC",
//   fillOpacity: 0.3,
//   radius: 20000,
// }).addTo(map);
