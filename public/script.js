function sendLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
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
          .then((data) => {
            console.log("Response:", data);
            showPopup("📍 Location sent successfully!");
          })
          .catch((err) => {
            console.error("Error sending location:", err);
            showPopup("❌ Failed to send location.");
          });
      },
      (err) => {
        console.error("Geolocation error:", err.message);
        showPopup("❌ Location access denied.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.textContent = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}
