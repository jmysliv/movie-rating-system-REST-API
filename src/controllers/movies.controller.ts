import { apikey } from './../apikey';
import { Movie, IMovieFromDatabase, IRating } from './../models/movie';
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
        const movie: Movie = new Movie();
        await movie.fillData(content.imdbID, content.Title, content.Year, content.Genre, req.user._id);
        res.status(200).send(movie);

    } catch(err) {
        res.status(500).send({error: err});
    }
}

export const markAsFavourite = (req: Request, res: Response) => {
    movieModel.findOneAndUpdate({imdbID: req.params.id},
        {$addToSet: {favouriteOfUsers: req.user._id}},
        { upsert: true, runValidators: true}, (err, result) => {
        if(err){
            res.status(500).send({error: err});
        } else {
            res.status(200).send({message: "movie added to favourite"})
        }
    })
}

export const unmarkAsFavourite = (req: Request, res: Response) => {
    movieModel.findOneAndUpdate({imdbID: req.params.id},
        {$pull: {favouriteOfUsers: req.user._id}},
        { upsert: true, runValidators: true}, (err, result) => {
        if(err){
            res.status(500).send({error: err});
        } else {
            res.status(200).send({message: "movie removed from favourite"})
        }
    })
}

export const addRating = (req: Request, res: Response) => {
    if(!req.body.rating){
        res.status(400).send({message: "Field rating is required to rate movie"});
    } else{
            movieModel.findOne({imdbID: req.params.id}, (err, result: IMovieFromDatabase) => {
                const newRate: IRating = {userId: req.user._id, rating: req.body.rating};
                if(result){
                    result.ratings = result.ratings.filter(rate => rate.userId !== req.user._id);
                    result.ratings.push(newRate);
                    const movie = new movieModel(result);
                    movie.save((e, r) => {
                        if(e) {
                            res.status(500).send(e);
                        } else {
                            res.status(200).send({message: "Movie rating has been saved"});
                        }
                    });
                } else {
                    const ratingArray =  Array<IRating>();
                    ratingArray.push(newRate);
                    const newMovie = new movieModel({imdbID: req.params.id, ratings: ratingArray, favouriteOfUsers: Array<string>()});
                    newMovie.save((e, r) => {
                        if(e) {
                            res.status(500).send(e);
                        } else {
                            res.status(200).send({message: "Movie rating has been saved"});
                        }
                    });
                }
            });
    }
}
