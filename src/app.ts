import { searchByTitle, markAsFavourite, unmarkAsFavourite } from './controllers/movies.controller';
import { validateToken } from './middleware/valid.token.middleware';
import mongoose from 'mongoose';
import { checkPasswordAndUser } from './middleware/verify.user.middleware';
import { register, login } from './controllers/user.controller';
import express, { NextFunction } from "express";
import path from "path";
import logger from "morgan";

mongoose.connect("mongodb://localhost/movie-rating-system", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("connected with mongo");
});

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../static_files")));

app.post("/register", register);
app.post("/login", [checkPasswordAndUser, login])
app.get("/movies/:title", [validateToken, searchByTitle]);
app.get("/mark-favourite/:id", [validateToken, markAsFavourite]);
app.get("/unmark-favourite/:id", [validateToken, unmarkAsFavourite]);

const server = app.listen(3000, "0.0.0.0", (e) => {
    console.log("running");
});