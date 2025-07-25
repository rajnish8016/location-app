function sendLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Generate Google Maps link
      const mapLink = `https://www.google.com/maps?q=${lat},${lon}`;
      console.log("Sending map link:", mapLink);

      // Send to backend
      fetch('/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mapLink }),
      });
    }, (error) => {
      console.error("Error getting location:", error);
      alert("Failed to retrieve location.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
