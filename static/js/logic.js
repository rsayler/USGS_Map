function createMap(earthQuakes) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the earthQuakes layer
  var overlayMaps = {
    "Earthquakes": earthQuakes
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [39.82, -98.57],
    zoom: 1,
    layers: [lightmap, earthQuakes]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {
  console.log(response)

  // Pull the "features" property off of response
  var features = response.features.type;

  // Initialize an array to hold earthquake markers
  var quakeMarker = [];

  // Loop through the features array
  features.forEach( feature =>{
    // For each earthquake, create a marker and bind a popup with the earthquake's information
    var quakeMarker = L.marker([features.geometry.coordiantes])
      .bindPopup("<h3>" + features.properties.title + "<h3><h3>Magnitude: " + features.properties.mag + "<h3>");
    // Add the marker to the quakeMarkers array
    quakeMarkers.push(quakeMarker);
  });

  // Create a layer group made from the earthquake markers array, pass it into the createMap function
  createMap(L.layerGroup(quakeMarkers));
}


// Perform an API call to the USGS API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);
