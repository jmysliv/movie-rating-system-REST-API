import express, { NextFunction } from "express";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../static_files")));



const server = app.listen(3000, "0.0.0.0", (e) => {
    console.log("running");
});