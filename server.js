const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.post("/location", (req, res) => {
  const { mapsUrl } = req.body;

  if (mapsUrl) {
    console.log("Received Google Maps link:", mapsUrl);
    res.json({ status: "success", link: mapsUrl });
  } else {
    console.log("Google Maps link not found in request.");
    res.status(400).json({ status: "error", message: "No location data" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
