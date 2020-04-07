export interface IRating{
    userID: string;
    rating: number;
}

export interface IMovieFromDatabase{
    imdbID: string;
    favouriteOfUsers: string[];
    ratings: IRating[];
}

export class Movie{
    imdbID: string = "";
    Title: string = "";
    Year: string = "";
    Genre: string = "";
    userFavourite: boolean = null;
    userRating: number = null;
    averageRating: number = null;
    constructor(id, title, year, genre){
        this.imdbID = id;
        this.Year = year;
        this.Title = title;
        this.Genre = genre;
    }

}
