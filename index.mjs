import express from "express";
import fetch from "node-fetch";
const planets = (await import("npm-solarsystem")).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const response = await fetch(
    "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system",
  );
  const data = await response.json();
  console.log(data);

  let random = Math.floor(Math.random() * 50);
  let randomImage = data.hits[random].webformatURL;
  console.log(random);
  console.log(randomImage);

  res.render("home.ejs", { randomImage });
});

// app.get("/mercury", (req, res) => {
//     let mercuryInfo = planets.getMercury();
//     console.log(mercuryInfo);
//     res.render("mercury.ejs", {mercuryInfo});
// });

app.get("/planetInfo", (req, res) => {
  let planetName = req.query.planet;
  let planetInfo = planets[`get${planetName}`]();
  console.log(planetInfo);
  res.render("planet.ejs", { planetInfo, planetName });
});

app.get("/asteroid", (req, res) => {
  let asteroidInfo = planets.getAsteroids();
  console.log(asteroidInfo);
  res.render("asteroid.ejs", { asteroidInfo });
});

app.get("/comet", (req, res) => {
  let cometInfo = planets.getComets();
  console.log(cometInfo);
  res.render("comet.ejs", { cometInfo });
});

app.get("/nasa", async (req, res) => {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let today = year + "-" + month + "-" + day;
    console.log(today);
  const response = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=" +
      today,
  );
  const data = await response.json();
  console.log(data);

  let nasaImage = data.url;
  res.render("nasa.ejs", { nasaImage });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:5050");
});
