function sendLocation(lat, lon) {
  fetch('/location', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ latitude: lat, longitude: lon })
  })
  .then(() => console.log("Sent:", lat, lon))
  .catch(err => console.error("Error sending:", err));
}

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      document.getElementById('status').innerText = `Location: ${lat}, ${lon}`;
      sendLocation(lat, lon);
    },
    (error) => {
      document.getElementById('status').innerText = "Error getting location.";
      console.error("Geolocation error:", error);
    },
    { enableHighAccuracy: true, maximumAge: 0 }
  );
} else {
  document.getElementById('status').innerText = "Geolocation not supported.";
}
