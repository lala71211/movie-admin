import {
    GET_MOVIE, GET_MOVIE_ID, ADD_MOVIE, EDIT_MOVIE, DELETE_MOVIE,
    GET_MOVIE_SUCCESS, GET_MOVIE_ERROR,
    GET_MOVIE_ID_SUCCESS, GET_MOVIE_ID_ERROR,
    ADD_MOVIE_SUCCESS, ADD_MOVIE_ERROR,
    EDIT_MOVIE_SUCCESS, EDIT_MOVIE_ERROR,
    DELETE_MOVIE_SUCCESS, DELETE_MOVIE_ERROR, DELETE_MOVIE_QUESTION,

} from "../actions";

export const getListMovies = (selectedPageSize, currentPage, selectedOrderOption, search) => ({
    type: GET_MOVIE,
    payload: { selectedPageSize, currentPage, selectedOrderOption, search }
});

export const getListMoviesSuccess = (listMovie) => ({
    type: GET_MOVIE_SUCCESS,
    payload: listMovie
});

export const getListMovieError = (message) => ({
    type: GET_MOVIE_ERROR,
    payload: message
});

export const getMovieByID = (id) => ({
    type: GET_MOVIE_ID,
    payload: id
});

export const getMovieByIDSuccess = (movie) => ({
    type: GET_MOVIE_ID_SUCCESS,
    payload: movie
});

export const getMovieByIDError = (message) => ({
    type: GET_MOVIE_ID_ERROR,
    payload: message
});

export const addMovie = (movieForm) => ({
    type: ADD_MOVIE,
    payload: movieForm
});

export const addMovieSuccess = (message) => ({
    type: ADD_MOVIE_SUCCESS,
    payload: message
});

export const addMovieError = (message) => ({
    type: ADD_MOVIE_ERROR,
    payload: message
});

export const editMovie = (id, movieForm) => ({
    type: EDIT_MOVIE,
    payload: { id, movieForm }
});

export const editMovieSuccess = (message) => ({
    type: EDIT_MOVIE_SUCCESS,
    payload: message
});

export const editMovieError = (message) => ({
    type: EDIT_MOVIE_ERROR,
    payload: message
});

export const deleteMovie = (id,status) => ({
    type: DELETE_MOVIE,
    payload: { id, status }
});

export const deleteMovieSuccess = (message) => ({
    type: DELETE_MOVIE_SUCCESS,
    payload: message
});

export const deleteMovieError = (message) => ({
    type: DELETE_MOVIE_ERROR,
    payload: message
})