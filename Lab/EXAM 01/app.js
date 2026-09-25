// 1. IMPORTS: Load Express for the web server, Path for folder paths,
//    and the native MongoDB driver for database operations.
const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

// 2. APP AND CONFIGURATION: Create the Express application and define
//    the server port and MongoDB database details.
const app = express();
const PORT = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
const dbName = "notes_lab";
const collectionName = "notes";

// This variable will store the MongoDB "notes" collection after connection.
let notesCollection;

// 3. MONGODB CONNECTION: Connect to the MongoDB server, select the
//    notes_lab database, and get access to its notes collection.
async function connectDB() {
  const client = new MongoClient(mongoURL);
  await client.connect();
  const db = client.db(dbName);
  notesCollection = db.collection(collectionName);
  console.log("Connected to MongoDB successfully");
}

// 4. EXPRESS AND EJS SETUP:
//    - EJS renders dynamic HTML pages from the views folder.
//    - urlencoded reads data submitted from HTML forms.
//    - static makes CSS and other public files available in the browser.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// 5. READ / SEARCH NOTES: Home page route. It fetches all notes, or
//    searches notes by title when the user provides a search query.
app.get("/", async (req, res) => {
  try {
    const search = (req.query.search || "").trim();
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const notes = await notesCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    res.render("index", { notes, search });
  } catch (error) {
    res.status(500).send("Database error: " + error.message);
  }
});

// Shortcut route: /notes redirects to the home page where all notes are shown.
app.get("/notes", (req, res) => {
  res.redirect("/");
});

// 6. SHOW ADD-NOTE FORM: Render new.ejs with an empty form.
app.get("/notes/new", (req, res) => {
  res.render("new", {
    error: "",
    form: { title: "", content: "", category: "" }
  });
});

// 7. CREATE NOTE: Receive form data, validate it, and insert one document
//    into the MongoDB notes collection.
app.post("/notes", async (req, res) => {
  try {
    const title = (req.body.title || "").trim();
    const content = (req.body.content || "").trim();
    const category = (req.body.category || "General").trim() || "General";

    if (!title || !content) {
      return res.status(400).render("new", {
        error: "Title and content are required.",
        form: { title, content, category }
      });
    }

    await notesCollection.insertOne({
      title,
      content,
      category,
      createdAt: new Date()
    });

    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error while adding note: " + error.message);
  }
});

// 8. DELETE NOTE: Read the note ID from the URL, check that it is a valid
//    MongoDB ObjectId, then remove the matching document from the collection.
app.post("/notes/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.redirect("/");
    }

    await notesCollection.deleteOne({ _id: new ObjectId(id) });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error while deleting note: " + error.message);
  }
});

// 9. 404 HANDLER: This runs when no route above matches the requested URL.
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// 10. STARTUP: First connect to MongoDB. Start the Express server only
//     after the database connection succeeds, so routes can use the collection.
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

  