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
          .then((res) => {
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json();
          })
          .then((data) => {
            console.log("✅ Location sent:", data);
            showPopup("✅ Location sent successfully!", true);
          })
          .catch((err) => {
            console.error("❌ Error sending location:", err);
            showPopup("❌ Failed to send location.", false);
          });
      },
      (err) => {
        console.error("❌ Geolocation error:", err.message);
        showPopup("❌ Failed to access location.", false);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPopup(message, isSuccess) {
  const popup = document.createElement("div");
  popup.innerText = message;
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.left = "50%";
  popup.style.transform = "translateX(-50%)";
  popup.style.backgroundColor = isSuccess ? "#4caf50" : "#f44336";
  popup.style.color = "white";
  popup.style.padding = "10px 20px";
  popup.style.borderRadius = "5px";
  popup.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
  popup.style.zIndex = "1000";
  document.body.appendChild(popup);

  setTimeout(() => {
    document.body.removeChild(popup);
  }, 3000);
}
