function sendLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
      console.log("Generated Maps URL:", mapsUrl);

      fetch("/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mapsUrl }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Response:", data))
        .catch((err) => console.error("Error:", err));
    }, (err) => {
      console.error("Geolocation error:", err.message);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
