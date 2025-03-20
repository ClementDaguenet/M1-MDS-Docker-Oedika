import express from "express";
import path from "path";
import compression from "compression";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 10000;

app.use((req, res, next) => {
    console.log(`Requested URL : ${req.originalUrl}.`);
    next();
});

app.use(compression());
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use((req, res) => {
    res.send("404");
});

app.listen(port, () => {
    console.log(`PWA running on http://localhost:${port}`);
});
