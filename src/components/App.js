import React, { useState, useEffect, useReducer } from 'react';
import '../App.css';
import Header from './Header'
import Movie from './Movie'
import Search from './Search'
import { stat } from 'fs';
const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";


const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
}

const cst = {
  SEARCH_MOVIE_SUCCESS: "SEARCH_MOVIE_SUCCESS",
  SEARCH_MOVIE_REQUEST: "SEARCH_MOVIE_REQUEST",
  SEARCH_MOVIE_FAILURE: "SEARCH_MOVIE_FAILURE"
}

const reducer = (state, action) => {
  switch (action.type) {
    case cst.SEARCH_MOVIE_REQUEST: return { ...state, loading: true, errorMessage: null }
    case cst.SEARCH_MOVIE_SUCCESS: return { ...state, loading: false, movies: action.playload }
    case cst.SEARCH_MOVIE_FAILURE: return { ...state, loading: false, errorMessage: action.error }
  }
}

const App = () => {

  // const [loading, setLoading] = useState(true)
  // const [movies, setMovie] = useState([])
  // const [errorMessage, setErrorMessage] = useState(null)

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    console.log("use effect");

    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(result => {
        // setMovie(result.Search)
        // setLoading(false)

        dispatch({
          type: cst.SEARCH_MOVIE_SUCCESS,
          playload: result.Search
        })
      })
  }, [])

  const search = searchValue => {
    // setLoading(true)
    // setErrorMessage(false)

    dispatch({
      type: cst.SEARCH_MOVIE_REQUEST
    })

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(result => {
        if (result.Response === "True") {
          // setMovie(result.Search)
          // setLoading(false)
          dispatch({
            type: cst.SEARCH_MOVIE_SUCCESS,
            playload: result.Search
          })
        }
        else {
          // setErrorMessage(result.Error)
          // setLoading(false)
          dispatch({
            type: cst.SEARCH_MOVIE_FAILURE,
            error: result.Error
          })
        }
      })
  }

  const { loading, movies, errorMessage } = state

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favurite movies</p>
      <div className="movies">
        {
          loading && !errorMessage ? (
            <span>loading...</span>
          ) :
            (
              errorMessage ?
                (<div className="errorMessage">{errorMessage}</div>)
                : (
                  movies.map((movie, index) => (
                    <Movie key={`${index}-${movie.Title}`} movie={movie} />
                  ))
                )
            )
        }

      </div>

    </div>
  )
}

export default App;
