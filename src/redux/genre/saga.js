import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';

import {
    GET_GENRE, ADD_GENRE, EDIT_GENRE, DELETE_GENRE,
} from "../actions";

import {
    getListGenresSuccess,
    getListGenreError,
    addGenreSuccess,
    addGenreError,
    editGenreSuccess,
    editGenreError,
    deleteGenreSuccess,
    deleteGenreError
} from './actions';

import { queryListGenres, addGenre, updateGenre, deleteGenre } from '../../repository/genre';

export function* watchGetListGenre() {
    yield takeEvery(GET_GENRE, handleGetListGenre)
};

function* handleGetListGenre({ payload }) {
    const selectedOrderOption = payload.selectedOrderOption;
    const search = payload.search;

    try {
        const listGenre = yield call(queryListGenres, selectedOrderOption, search);
        // console.log(listGenre);
        if (!listGenre.message) {
            yield put(getListGenresSuccess(listGenre))
        }
        else {
            yield put(getListGenreError(listGenre.message))
        }
    } catch (error) {
        yield put(getListGenreError(error))
    }
}

export function* watchAddGenre() {
    yield takeLatest(ADD_GENRE, handleAddGenre)
}

function* handleAddGenre({ payload }) {
    const genreForm = payload;
    // console.log(genreForm)
    try {
        const newGenre = yield call(addGenre, genreForm);
        // console.log(newGenre);
        if (newGenre.success === "CREATED") {
            yield put(addGenreSuccess(newGenre.message))
        }
        else {
            yield put(addGenreError(newGenre.message))
        }
    } catch (error) {
        yield put(addGenreError(error))
    }
}

export function* watchEditGenre() {
    yield takeLatest(EDIT_GENRE, handleEditGenre)
}

function* handleEditGenre({ payload }) {
    const genreForm = payload;
    console.log(genreForm)
    try {
        const editGenre = yield call(updateGenre, genreForm);
        console.log(editGenre);
        if (editGenre.success === "OK") {
            yield put(editGenreSuccess(editGenre.message))
        }
        else {
            yield put(editGenreError(editGenre.message))
        }
    } catch (error) {
        yield put(editGenreError(error))
    }
}

export function* watchDeleteGenre() {
    yield takeLatest(DELETE_GENRE, handleDeleteGenre)
}

function* handleDeleteGenre({ payload }) {
    const id = payload;
    console.log(id)
    try {
        const deleted = yield call(deleteGenre, id);
        console.log(deleted);
        if (deleted.success === "OK") {
            yield put(deleteGenreSuccess(deleted.message))
        }
        else {
            yield put(deleteGenreError(deleted.message))
        }
    } catch (error) {
        yield put(deleteGenreError(error))
    }
}

export default function* rootSaga() {
    yield all([
        fork(watchGetListGenre),
        fork(watchAddGenre),
        fork(watchEditGenre),
        fork(watchDeleteGenre)
    ]);
}