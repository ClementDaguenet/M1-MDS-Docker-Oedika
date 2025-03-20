const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;
const corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const dbPath = path.join(__dirname, "database", "photos.db");

const fs = require("fs");
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Connexion à SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erreur lors de la connexion à SQLite :", err.message);
  } else {
    console.log("Connecté à la base SQLite.");
    db.run(
      "CREATE TABLE IF NOT EXISTS photos (id INTEGER PRIMARY KEY AUTOINCREMENT, image BLOB)"
    );
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/photos", upload.single("photo"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("Aucune photo reçue");
  }
  console.log("Photo reçue !");

  try {
    const imageData = req.file.buffer.toString("base64");
    db.run(
      "INSERT INTO photos (image) VALUES (?)",
      [imageData],
      function (err) {
        if (err) {
          console.error("Erreur lors de l'enregistrement de la photo :", err);
          return res.status(500).send("Erreur serveur");
        }
        res.sendStatus(200);
      }
    );
  } catch (err) {
    console.error("Erreur lors de l'enregistrement de la photo :", err);
    res.status(500).send("Erreur serveur");
  }
});

app.get("/photos", (req, res) => {
  db.all("SELECT id, image FROM photos", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const photos = rows.map((row) => ({
      id: row.id,
      image: row.image.toString("base64"),
    }));
    res.json(photos);
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
