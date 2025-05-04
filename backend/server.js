const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 8080;
const host = "localhost";

const url = "mongodb://127.0.0.1:27017";
const dbName = "melodify";
const client = new MongoClient(url);

let db;

async function connectToMongo() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  }
}

app.listen(port, async () => {
  await connectToMongo();
  console.log("App listening at http://%s:%s", host, port);
});

app.get("/artist", async (req, res) => {
  const results = await db.collection("artist").find({}).limit(100).toArray();
  res.status(200).send(results);
});

app.get("/artist/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const results = await db.collection("artist").find({ name }).toArray();
    res.status(200).send(results);
  } catch (error) {
    console.error("Error fetching artist by name:", error);
    res.status(500).send("Error fetching artist by name");
  }
});

app.post("/survey", async (req, res) => {
  try {
    const newSurvey = {
      name: req.body.name,
      email: req.body.email,
      favoriteArtist: req.body.favoriteArtist,
      websiteRating: req.body.websiteRating,
      shoppingExperienceRating: req.body.shoppingExperienceRating,
      featuresLiked: req.body.featuresLiked,
      suggestions: req.body.suggestions,
    };

    const result = await db.collection("survey").insertOne(newSurvey);
    res.status(200).send(result);
  } catch (error) {
    console.error("Could not add the new survey response:", error);
    res.status(500).send("Error adding new survey response");
  }
});

app.put("/survey/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const updatedFields = {
      name: req.body.name,
      favoriteArtist: req.body.favoriteArtist,
      websiteRating: req.body.websiteRating,
      shoppingExperienceRating: req.body.shoppingExperienceRating,
      featuresLiked: req.body.featuresLiked,
      suggestions: req.body.suggestions,
    };

    const result = await db
      .collection("survey")
      .updateOne({ email }, { $set: updatedFields });

    if (result.matchedCount === 0) {
      res.status(404).send("Survey response not found for this email");
    } else {
      res.status(200).send("Survey response updated successfully");
    }
  } catch (error) {
    console.error("Could not update the survey response:", error);
    res.status(500).send("Error updating survey response");
  }
});
