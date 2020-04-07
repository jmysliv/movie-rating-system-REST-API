Movie-rating-system REST API
===
## Get started
1. Clone the repository with the following command:
```
git clone git@github.com:jmysliv/movie-rating-system-REST-API.git
```
2. When the repository has been cloned:
```
cd movie-rating-system-REST-API
```
3. Create new file: './src/apikey.ts' and put inside the following content:
```TypeScript
export const apikey = "paste your api key to OMDb API";
```
4. Setup MongoDB connection: open './src/app.ts', find the following line: 
```TypeScript
mongoose.connect("mongodb://localhost/movie-rating-system", ...)
```
and replace "mongodb://localhost/movie-rating-system" with proper url for your mongoDB connection.

5. If you don't have npm installed do it now: https://nodejs.org/en/

6. Run the following commands:
```
npm install
npm start
``` 