var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 14.661036549999999, lng: -90.6067968 },
        zoom: 8
    });

    document.getElementById('searchButton').addEventListener('click', function () {
        var place = document.getElementById('searchPlaceInput').value;
        var city = document.getElementById('searchCityInput').value;
        var dep = document.getElementById('searchDepInput').value;
        var query = [place, city, dep].filter(Boolean).join(', ');
        searchPlace(query);
    });
}

function searchPlace(query) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': query }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('La búsqueda no tuvo éxito debido a: ' + status);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    initMap();
});
