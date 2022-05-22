import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const app = express();

//use cors and express
app.use(cors());
app.use(express.json());

//the main api url
app.use("/api/v1/restaurants", restaurants);

//if we get 404 print error
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
