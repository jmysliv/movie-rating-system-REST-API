import { apikey } from './../apikey';
import { Movie } from './../models/movie';
import { Request, Response } from "express";
import fetch from "node-fetch";
import movieModel from '../models/movie.model';

export const searchByTitle = async (req: Request, res: Response) => {
    const url = `http://www.omdbapi.com/?apikey=${apikey}&t=${req.params.title}`;
    try{
        const response = await fetch(url);
        if (response.status !== 200) {
            res.status(500).send({message: "Cannot fetch movie from API"})
        }
        const content = await response.json();
        const movie: Movie = (new Movie());
        await movie.fillData(content.imdbID, content.Year, content.Title, content.Genre, req.user._id);
        res.status(200).send(movie);

    } catch(err) {
        res.status(500).send({error: err});
    }
}

export const markAsFavourite = (req: Request, res: Response) => {
    movieModel.findOneAndUpdate({imdbID: req.params.id}, {$push: {favouriteOfUsers: req.user._id}}, { upsert: true}, (err, result) => {
        if(err){
            res.status(500).send({error: err});
        } else {
            res.status(200).send({message: "movie added to favourite"})
        }
    })
}

export const unmarkAsFavourite = (req: Request, res: Response) => {
    movieModel.findOneAndUpdate({imdbID: req.params.id}, {$pull: {favouriteOfUsers: req.user._id}}, { upsert: true}, (err, result) => {
        if(err){
            res.status(500).send({error: err});
        } else {
            res.status(200).send({message: "movie removed from favourite"})
        }
    })
}