
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

function addMarker(name, uid, latlng) {
  L.marker(latlng).addTo(map)
    .bindPopup(`<strong>${name}</strong><br>UID: ${uid}`)
    .openPopup();
}

map.on('click', function(e) {
  const popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(`
      <form id="pinForm">
        <label>In-Game Name</label>
        <input type="text" id="ign" required />
        <label>UID</label>
        <input type="text" id="uid" required />
        <button type="submit">Drop Pin</button>
      </form>
    `)
    .openOn(map);

  document.getElementById('pinForm').addEventListener('submit', function(evt) {
    evt.preventDefault();
    const name = document.getElementById('ign').value;
    const uid = document.getElementById('uid').value;
    addMarker(name, uid, e.latlng);
    map.closePopup();
  });
});
