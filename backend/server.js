const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};
app.use(cors(corsOptions));

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

// Submit survey
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

// Update survey response
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

// Fetch all users' personal profiles
app.get("/personalProfile", async (req, res) => {
  try {
    const users = await db
      .collection("personalProfile")
      .find({})
      .project({ username: 1, email: 1, age: 1, _id: 0 }) // Exclude _id and password
      .toArray();

    if (users.length === 0) {
      return res.status(404).send("No users found.");
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).send("Failed to fetch users.");
  }
});

// Fetch personal profile by email
app.get("/personalProfile/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    if (!userEmail) {
      return res.status(400).send("Email parameter is required.");
    }

    const user = await db
      .collection("personalProfile")
      .findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Failed to fetch user data.");
  }
});

// Register new user for personal profile
app.post("/personalProfile", async (req, res) => {
  try {
    const { username, email, age, password } = req.body;

    const existingUser = await db
      .collection("personalProfile")
      .findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists.");
    }

    const result = await db.collection("personalProfile").insertOne({
      username,
      email,
      age,
      password,
    });

    res.status(201).send("Account created successfully.");
  } catch (error) {
    console.error("Error saving personal profile:", error);
    res.status(500).send("Server error while creating account.");
  }
});

// Update password
app.put("/personalProfile/changePassword", async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
      return res
        .status(400)
        .send("Email, current password, and new password are required.");
    }

    const user = await db.collection("personalProfile").findOne({ email });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    if (user.password !== currentPassword) {
      return res.status(400).send("Current password is incorrect.");
    }

    const result = await db
      .collection("personalProfile")
      .updateOne({ email }, { $set: { password: newPassword } });

    if (result.matchedCount === 0) {
      return res.status(404).send("User not found.");
    }

    res.status(200).send("Password updated successfully.");
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send("Error updating password.");
  }
});

// Delete personal profile by email
app.delete("/personalProfile/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    if (!userEmail) {
      return res.status(400).send("Email parameter is required.");
    }

    const result = await db
      .collection("personalProfile")
      .deleteOne({ email: userEmail });

    if (result.deletedCount === 0) {
      return res.status(404).send("User not found.");
    }

    res.status(200).send("User deleted successfully.");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Failed to delete user.");
  }
});

// Login functionality
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }

    const user = await db.collection("personalProfile").findOne({ email });

    if (!user) {
      return res.status(401).send("User not found.");
    }

    if (user.password !== password) {
      return res.status(401).send("Invalid password.");
    }

    res.status(200).send("Login successful.");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login.");
  }
});

