
const map = L.map('map', {
  worldCopyJump: false,
  continuousWorld: false,
  noWrap: true,
  maxBounds: [
    [-85, -180],
    [85, 180]
  ],
  maxBoundsViscosity: 1.0,
  minZoom: 2,
  maxZoom: 10
}).setView([20, 0], 2);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19,
  noWrap: true,
  bounds: [[-85, -180], [85, 180]]
}).addTo(map);

// Function to add a pin to the map with popup info
function addMarker(name, uid, discord, latlng) {
  L.marker(latlng).addTo(map)
    .bindPopup(`<strong>${name}</strong><br>UID: ${uid}<br>Discord: ${discord || 'N/A'}`)
    .openPopup();
}

// On map click, open input popup
map.on('click', function(e) {
  const popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(`
      <form id="pinForm">
        <label>In-Game Name</label>
        <input type="text" id="ign" required />
        <label>UID</label>
        <input type="text" id="uid" required />
        <label>Discord Username</label>
        <input type="text" id="discord" placeholder="e.g. yourname#1234" />
        <button type="submit">Drop Pin</button>
      </form>
    `)
    .openOn(map);

  // Form submission handler
  document.getElementById('pinForm').addEventListener('submit', function(evt) {
    evt.preventDefault();
    const name = document.getElementById('ign').value;
    const uid = document.getElementById('uid').value;
    const discord = document.getElementById('discord').value;
    addMarker(name, uid, discord, e.latlng);
    map.closePopup();
  });
});
