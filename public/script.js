function sendLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log("Latitude:", lat, "Longitude:", lon);

        fetch('/location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ latitude: lat, longitude: lon })
        })
        .then(res => res.text())
        .then(data => console.log("Server response:", data))
        .catch(err => console.error("Error sending location:", err));
      },
      (error) => {
        console.error("Error getting location:", error.message);
        alert("Unable to retrieve location. Please allow location access.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};
