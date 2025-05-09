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

app.get("/personalProfile", async (req, res) => {
  try {
    // Fetch all users from the personalProfile collection
    const users = await db
      .collection("personalProfile")
      .find({})
      .project({ username: 1, email: 1, age: 1, _id: 0 }) // Exclude _id and password
      .toArray();

    if (users.length === 0) {
      return res.status(404).send("No users found.");
    }

    // Send the users data as response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).send("Failed to fetch users.");
  }
});

app.get("/personalProfile/:email", async (req, res) => {
  try {
    // Get user email from URL parameter
    const userEmail = req.params.email;
    if (!userEmail) {
      return res.status(400).send("Email parameter is required.");
    }

    // Fetch user data from database
    const user = await db
      .collection("personalProfile")
      .findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Send the user data as response
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Failed to fetch user data.");
  }
});

app.post("/personalProfile", async (req, res) => {
  try {
    const { username, email, age, password } = req.body;

    // Check if the user already exists
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

// Endpoint to update the user's password
app.put("/personalProfile/changePassword", async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    // Check if email and password are provided
    if (!email || !currentPassword || !newPassword) {
      return res
        .status(400)
        .send("Email, current password, and new password are required.");
    }

    // Find the user by email
    const user = await db.collection("personalProfile").findOne({ email });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Check if the current password matches the stored password (passwords should be hashed in a real app)
    if (user.password !== currentPassword) {
      return res.status(400).send("Current password is incorrect.");
    }

    // Update the password
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

app.delete("/personalProfile/:email", async (req, res) => {
  try {
    // Get user email from URL parameter
    const userEmail = req.params.email;
    if (!userEmail) {
      return res.status(400).send("Email parameter is required.");
    }

    // Delete user from database
    const result = await db
      .collection("personalProfile")
      .deleteOne({ email: userEmail });

    if (result.deletedCount === 0) {
      return res.status(404).send("User not found.");
    }

    // Send success response
    res.status(200).send("User deleted successfully.");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Failed to delete user.");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }

    // Find user in personalProfile collection
    const user = await db.collection("personalProfile").findOne({ email });

    if (!user) {
      return res.status(401).send("User not found.");
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).send("Invalid password.");
    }

    res.status(200).send("Login successful.");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login.");
  }
});
