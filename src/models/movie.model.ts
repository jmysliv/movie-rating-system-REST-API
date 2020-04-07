import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    imdbID:{
        required: true,
        type: String
    },
    favouriteOfUsers: {
        type: [String]
    },
    ratings: [{
        userId: {
            required: true,
            type: String
        },
        rating: {
            min: 1,
            max: 10,
            required: true,
            type: Number
        }
    }]
})

const movieModel = mongoose.model("movies", movieSchema);
mongoose.set("useFindAndModify", false);
export default movieModel;
