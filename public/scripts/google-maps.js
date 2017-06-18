function initMap () {
  const teWharePiringa = {lat: -36.874920, lng: 174.869957}
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: teWharePiringa
  })
  const marker = new google.maps.Marker({
    position: teWharePiringa,
    map: map
  })
}
