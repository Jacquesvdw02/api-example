let map;
let localContextMapView;
let currentMarker;
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
      { type: "bank"},
      { type: "cafe"},
      { type: "department_store"},
      { type: "park"},
      { type: "restaurant"},
      { type: "primary_school"},
      { type: "secondary_school"},
      { type: "supermarket"},
    ],
    placeChooserViewSetup: {layoutMode: 'HIDDEN'},
    maxPlaceCount: 24,

  });
  map = localContextMapView.map;
  map.setOptions({
    center: { lat: -25.777807, lng: 28.256782 },
    zoom: 18,
    styles,
  });
  makeMarker({ lat: -25.777807, lng: 28.256782 });
  const input = document.getElementById("input");
  const options = {
    types: ["address" | "establishment"],
    componentRestrictions: {
      country: "za",
    },
    fields: ["address_components", "geometry", "name"],
  };
  const autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place || !place.geometry) {
      window.alert("No address available for that input.");
      return;
    }
    map.setOptions({
      center: place.geometry.location,
      zoom: 14,
    });
    localContextMapView.directionsOptions = {
      origin: place.geometry.location,
    };   
    makeMarker(place.geometry.location);
    localContextMapView.search();
  });
}

function makeMarker(location) {
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    zIndex: 30,
  });

  if(currentMarker != null || currentMarker != undefined){
    currentMarker.setMap(null);
  }
  currentMarker = marker;
  marker.addListener("rightclick", () => {
    
  });
}

window.initMap = initMap;