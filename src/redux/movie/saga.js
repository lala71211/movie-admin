import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
    GET_MOVIE, GET_MOVIE_ID, ADD_MOVIE, EDIT_MOVIE, DELETE_MOVIE,
    // GET_COMMENT, DELETE_COMMENT,
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
    // getListCommentsSuccess,
    // getListCommentError,
} from './actions';

import { queryListMovies, queryMovieByID, addMovie, updateMovie } from '../../repository/movie';
import { queryListComments,} from '../../repository/comment';

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
    // console.log(movieForm)
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
// export function* watchGetListComment() {
//     yield takeLatest(GET_COMMENT, handleGetListComment)
// };

// function* handleGetListComment({ payload }) {
//     const selectedPageSize = payload.selectedPageSize;
//     const currentPage = payload.currentPage;
//     const movieId = payload.movieId;
//     const userId = payload.userId;
//     console.log("asdsf")
//     try {
//         const listComment = yield call(queryListComments, selectedPageSize, currentPage, movieId, userId);
//         console.log(listComment);
//         if (!listComment.message) {
//             yield put(getListCommentsSuccess(listComment))
//         }
//         else {
//             yield put(getListCommentError(listComment.message))
//         }
//     } catch (error) {
//         yield put(getListCommentError(error))
//     }
// }

export default function* rootSaga() {
    yield all([
        fork(watchGetListMovie),
        fork(watchAddMovie),
        fork(watchEditMovie),
        fork(watchGetMovieByID),
        // fork(watchGetListComment),
    ]);
}