import movieModel from "./movie.model";

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

    public async fillData(id, title, year, genre, userId){
        this.imdbID = id;
        this.Year = year;
        this.Title = title;
        this.Genre = genre;
        await this.fillUserFavourite(userId);
    }

    private async fillUserFavourite(userId: string) {
        await movieModel.findOne({imdbID: this.imdbID}, (err, result: IMovieFromDatabase) => {
            this.userFavourite = false;
            if (result) {
                result.favouriteOfUsers.forEach(id => {
                    if(id === userId){
                        this.userFavourite = true;
                        return;
                    }
                })
            }
        })
    }

}
