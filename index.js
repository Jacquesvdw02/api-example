let map;
let localContextMapView;
const styles = [
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

function initMap() {
  localContextMapView = new google.maps.localContext.LocalContextMapView({
    element: document.getElementById("map"),
    placeTypePreferences: [
      { type: "gym", weight: 1 },
      { type: "bank", weight: 1 },
      { type: "cafe", weight: 2 },
      { type: "department_store", weight: 1 },
      // { type: "drugstore", weight: 1 },
      { type: "park", weight: 3 },
      { type: "restaurant", weight: 2 },
      { type: "primary_school", weight: 3 },
      { type: "secondary_school", weight: 3 },
      { type: "supermarket", weight: 2 },
    ],
    maxPlaceCount: 24,
  });
  map = localContextMapView.map;
  map.setOptions({
    center: { lat: -25.777807, lng: 28.256782 },
    zoom: 14,
    styles,
  });

  // new google.maps.Marker({
  //   position: { lat: -25.777807, lng: 28.256782 },
  //   map: map,
  //   icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAbUlEQVR4Ae3LoQ2AMAAF0TMYPJoV2IApGIJtmIMtmIAVqutraj6IiqZpmyYoCO/08R7bXbOOHSF2Ohr0HCh00EPdwImiTgYqRgxKMowUTFiUyTKRMeNQIcdMYsGjSp6FyIoaWkmoUuLxEPzDh1xIaLFFuTyHMgAAAABJRU5ErkJggg==",
  //   zIndex: 30,
  // });

  // Build and add the Autocomplete search bar
  const input = document.getElementById("input");
  const options = {
    types: ["address"],
    componentRestrictions: {
      country: "za",
    },
    fields: ["address_components", "geometry", "name"],
  };
  const autocomplete = new google.maps.places.Autocomplete(input, options);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    if (!place || !place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No address available for that input.");
      return;
    }

    // Recenter the map to the selected address
    // marker.setMap(null);
    map.setOptions({
      center: place.geometry.location,
      zoom: 14,
    });
    // Update the localContext directionsOptions origin
    localContextMapView.directionsOptions = {
      origin: place.geometry.location,
    };
    const marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAbUlEQVR4Ae3LoQ2AMAAF0TMYPJoV2IApGIJtmIMtmIAVqutraj6IiqZpmyYoCO/08R7bXbOOHSF2Ohr0HCh00EPdwImiTgYqRgxKMowUTFiUyTKRMeNQIcdMYsGjSp6FyIoaWkmoUuLxEPzDh1xIaLFFuTyHMgAAAABJRU5ErkJggg==",
      zIndex: 30,
    });
    // update the results with new places
    localContextMapView.search();
  });
}

window.initMap = initMap;