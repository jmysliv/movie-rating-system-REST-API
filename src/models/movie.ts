import movieModel from "./movie.model";

export interface IRating{
    userId: string;
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

    public async fillData(id: string, title: string, year: string, genre: string, userId: string){
        this.imdbID = id;
        this.Year = year;
        this.Title = title;
        this.Genre = genre;
        await this.fillUserFavourite(userId);
        await this.fillUserRating(userId)
        await this.fillAverageRating();
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

    private async fillUserRating(userId: string) {
        await movieModel.findOne({imdbID: this.imdbID}, (err, result: IMovieFromDatabase) => {
            if (result) {
                result.ratings.forEach(rating => {
                    if(rating.userId === userId){
                        this.userRating = rating.rating;
                        return;
                    }
                })
            }
        })
    }

    private async fillAverageRating() {
        await movieModel.findOne({imdbID: this.imdbID}, (err, result: IMovieFromDatabase) => {
            if (result) {
                let sum = 0;
                result.ratings.forEach(rating => {
                    sum += rating.rating;
                })
                this.averageRating = sum/result.ratings.length;
            }
        })
    }

}
