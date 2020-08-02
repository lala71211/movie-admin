import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
    GET_MOVIE, GET_MOVIE_ID, ADD_MOVIE, EDIT_MOVIE, DELETE_MOVIE,
    
} from "../actions";

import {
    getListMoviesSuccess,
    getListMovieError,
    getMovieByIDSuccess,
    getMovieByIDError,
    addMovieSuccess,
    addMovieError,
    editMovieSuccess,
    editMovieError,
    deleteMovieSuccess,
    deleteMovieError,
} from './actions';

import { queryListMovies, queryMovieByID, addMovie, updateMovie, changeStatusMovie } from '../../repository/movie';

export function* watchGetListMovie() {
    yield takeLatest(GET_MOVIE, handleGetListMovie)
};

function* handleGetListMovie({ payload }) {
    const selectedPageSize = payload.selectedPageSize;
    const currentPage = payload.currentPage;
    const selectedOrderOption = payload.selectedOrderOption;
    const search = payload.search;

    try {
        const listMovie = yield call(queryListMovies, selectedPageSize, currentPage, selectedOrderOption, search);
        // console.log(ListMovie);
        if (!listMovie.message) {
            yield put(getListMoviesSuccess(listMovie.result))
        }
        else {
            yield put(getListMovieError(listMovie.message))
        }
    } catch (error) {
        yield put(getListMovieError(error))
    }
}

export function* watchGetMovieByID() {
    yield takeLatest(GET_MOVIE_ID, handleGetMovieByID)
};

function* handleGetMovieByID({ payload }) {
    const id = payload
    try {
        const movie = yield call(queryMovieByID, id);
        if (!movie.message) {
            yield put(getMovieByIDSuccess(movie.result))
        }
        else {
            yield put(getMovieByIDError(movie.message))
        }
    } catch (error) {
        yield put(getMovieByIDError(error))
    }
}

export function* watchAddMovie() {
    yield takeLatest(ADD_MOVIE, handleAddMovie)
}

function* handleAddMovie({ payload }) {
    const movieForm = payload;
    console.log(movieForm)
    try {
        const newMovie = yield call(addMovie, movieForm);
        console.log(newMovie);
        if (newMovie.success === "CREATED") {
            yield put(addMovieSuccess(newMovie.message))
        }
        else {
            yield put(addMovieError(newMovie.message))
        }
    } catch (error) {
        yield put(addMovieError(error))
    }
}

export function* watchEditMovie() {
    yield takeLatest(EDIT_MOVIE, handleEditMovie)
}

function* handleEditMovie({ payload }) {
    const movieForm = payload.movieForm;
    const id = payload.id;
    console.log(payload)
    try {
        const editMovie = yield call(updateMovie, id, movieForm);
        console.log(editMovie);
        if (editMovie.success === "OK") {
            yield put(editMovieSuccess(editMovie.message))
        }
        else {
            yield put(editMovieError(editMovie.message))
        }
    } catch (error) {
        yield put(editMovieError(error))
    }
}

export function* watchDeleteMovie() {
    yield takeLatest(DELETE_MOVIE, handleDeleteMovie)
}

function* handleDeleteMovie({ payload }) {
    const id = payload.id;
    const status = payload.status;
    console.log(payload)
    try {
        const deleteMovie = yield call(changeStatusMovie, id, status);
        console.log(deleteMovie);
        if (deleteMovie.success === "OK") {
            yield put(deleteMovieSuccess(deleteMovie.message))
        }
        else {
            yield put(deleteMovieError(deleteMovie.message))
        }
    } catch (error) {
        yield put(deleteMovieError(error))
    }
}


export default function* rootSaga() {
    yield all([
        fork(watchGetListMovie),
        fork(watchAddMovie),
        fork(watchEditMovie),
        fork(watchGetMovieByID),
        fork(watchDeleteMovie)
    ]);
}