import MapWidget, { MapWidgetOptions } from "./widget";

const options: MapWidgetOptions = {
  accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN',
  center: [-74.5, 40], // Longitude, Latitude
  zoom: 9,
  style: 'mapbox://styles/mapbox/streets-v11'
};

const map = new MapWidget('map', options);

// Add markers
map.addMarker(40, -74.5, 'Marker 1');
map.addMarker(41, -75.5, 'Marker 2');

// Fly to a location
map.flyTo([-75.5, 41]);