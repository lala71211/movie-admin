import {
    GET_MOVIE, GET_MOVIE_ID, ADD_MOVIE, EDIT_MOVIE, DELETE_MOVIE,
    GET_MOVIE_SUCCESS, GET_MOVIE_ERROR,
    GET_MOVIE_ID_SUCCESS, GET_MOVIE_ID_ERROR,
    ADD_MOVIE_SUCCESS, ADD_MOVIE_ERROR,
    EDIT_MOVIE_SUCCESS, EDIT_MOVIE_ERROR,
    DELETE_MOVIE_SUCCESS, DELETE_MOVIE_ERROR, DELETE_MOVIE_QUESTION,
    // GET_COMMENT, DELETE_COMMENT,
    // GET_COMMENT_SUCCESS, GET_COMMENT_ERROR,
    // DELETE_COMMENT_SUCCESS, DELETE_COMMENT_ERROR, DELETE_COMMENT_QUESTION
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

export const editMovie = (movieForm) => ({
    type: EDIT_MOVIE,
    payload: movieForm
});

export const editMovieSuccess = (message) => ({
    type: EDIT_MOVIE_SUCCESS,
    payload: message
});

export const editMovieError = (message) => ({
    type: EDIT_MOVIE_ERROR,
    payload: message
});

// export const getListComments = (selectedPageSize, currentPage, movieId, userId) => ({
//     type: GET_COMMENT,
//     payload: { selectedPageSize, currentPage, movieId, userId }
// });

// export const getListCommentsSuccess = (listComment) => ({
//     type: GET_COMMENT_SUCCESS,
//     payload: listComment
// });

// export const getListCommentError = (message) => ({
//     type: GET_COMMENT_ERROR,
//     payload: message
// });


