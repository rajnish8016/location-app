function sendLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Send to backend (optional)
        fetch('/location', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude: lat, longitude: lon })
        });

        // Create and show Google Maps link
        const mapLink = `https://www.google.com/maps?q=${lat},${lon}`;
        const linkElement = document.createElement("a");
        linkElement.href = mapLink;
        linkElement.textContent = `📍 View My Location on Google Maps`;
        linkElement.target = "_blank";

        document.body.appendChild(document.createElement("br"));
        document.body.appendChild(linkElement);
      },
      (error) => {
        console.error("Error getting location:", error.message);
        alert("Unable to retrieve location. Please check your settings.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
