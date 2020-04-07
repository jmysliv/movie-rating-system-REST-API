import { apikey } from './../apikey';
import { Movie } from './../models/movie';
import { Request, Response } from "express";
import fetch from "node-fetch";

export const searchByTitle = async (req: Request, res: Response) => {
    const url = `http://www.omdbapi.com/?apikey=${apikey}&t=${req.params.title}`;
    try{
        const response = await fetch(url);
        if (response.status !== 200) {
            res.status(500).send({message: "Cannot fetch movie from API"})
        }
        const content = await response.json();
        const movie: Movie = new Movie(content.imdbID, content.Year, content.Title, content.Genre);
        res.status(200).send(movie);

    } catch(err) {
        res.status(500).send({error: err});
    }
}