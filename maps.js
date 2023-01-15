var map = L.map('map').setView([-6.200000, 106.816666], 12);

map.locate({setView: true, maxZoom: 16});

L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map)

L.Routing.control({
    routeWhileDragging: false,
    geocoder : new L.Control.Geocoder.Nominatim()
}).addTo(map);

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);