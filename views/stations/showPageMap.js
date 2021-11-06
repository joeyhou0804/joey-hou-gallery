mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: station.geometry.coordinates,
    zoom: 7
});

new mapboxgl.Marker()
    .setLngLat(station.geometry.coordinates)
    .addTo(map)