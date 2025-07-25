function sendLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log("Sending location:", lat, lon);

        fetch('/location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ latitude: lat, longitude: lon }),
        })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to send location');
          }
        })
        .catch((error) => {
          console.error('Error sending location:', error);
        });
      },
      (error) => {
        console.error('Error getting location:', error.message);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Call the function once the page loads
window.onload = sendLocation;
