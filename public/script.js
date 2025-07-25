document.getElementById('sendBtn').addEventListener('click', () => {
  const status = document.getElementById('status');

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  status.textContent = "Getting location...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const mapsUrl = `https://maps.google.com/?q=${lat},${lon}`;

      status.innerHTML = `📍 Location sent: <a href="${mapsUrl}" target="_blank">Open in Google Maps</a>`;

      fetch('/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mapsUrl }),
      })
      .then(() => console.log("Location sent successfully."))
      .catch((err) => {
        console.error("Error sending location:", err);
        status.textContent = "Failed to send location.";
      });
    },
    (error) => {
      console.error("Geolocation error:", error);
      switch (error.code) {
        case error.PERMISSION_DENIED:
          status.textContent = "Permission denied. Please allow location access.";
          break;
        case error.POSITION_UNAVAILABLE:
          status.textContent = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          status.textContent = "Location request timed out.";
          break;
        default:
          status.textContent = "An unknown error occurred.";
          break;
      }
    }
  );
});
