
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

// Custom marker icon (smaller & golden)
const customIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
  iconSize: [16, 25], // ~75% of default size
  iconAnchor: [8, 25],
  popupAnchor: [1, -24],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [30, 30]
});

// Function to add marker with popup
function addMarker(name, uid, discord, latlng) {
  L.marker(latlng, { icon: customIcon }).addTo(map)
    .bindPopup(`<strong>${name}</strong><br>UID: ${uid}<br>Discord: ${discord || 'N/A'}`)
    .openPopup();
}

// Map click → open input form popup
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
        <input type="text" id="discord" />
        <button type="submit">Drop Pin</button>
      </form>
    `)
    .openOn(map);

  // Form submit logic
  document.getElementById('pinForm').addEventListener('submit', function(evt) {
    evt.preventDefault();
    const name = document.getElementById('ign').value;
    const uid = document.getElementById('uid').value;
    const discord = document.getElementById('discord').value;
    addMarker(name, uid, discord, e.latlng);
    map.closePopup();
  });
});
// Add Call of Duty Mobile logo as a non-clickable image overlay
L.imageOverlay(
  'https://styles.redditmedia.com/t5_penom/styles/communityIcon_386whbh0z5041.png',
  [[ -50, -150 ], [ -20, -80 ]],
  {
    opacity: 10.95
  }
).addTo(map);
