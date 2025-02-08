import express, { urlencoded, json } from "express";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "./db";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World (Gleam API)");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});
