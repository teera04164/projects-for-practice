import React from 'react'
import { className } from 'postcss-selector-parser';

const DEFAULT_IMG = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg"
const Movie = ({movie}) => {
    console.log("log =>: ----------------------------")
    console.log("log =>: Movie -> movie", movie)
    console.log("log =>: ----------------------------")
    const poster = movie.Poster === "N/A" ? DEFAULT_IMG : movie.Poster
    return(
        <div className = "movie">
        <h2>{movie.Title}</h2>
        <div>
            <img 
            width ="200"
            // alt = {`The movie title : ${movie.Title}`} 
            alt = {`The movie title `} 
            src = {poster}
            />
        </div>
        {/* <p>{Movie.Year}</p> */}
        </div>
    )

}

export default Movie