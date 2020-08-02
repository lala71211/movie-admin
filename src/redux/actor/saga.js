import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
    GET_ACTOR, ADD_ACTOR, EDIT_ACTOR, DELETE_ACTOR,
} from "../actions";

import {
    getListActorsSuccess,
    getListActorError,
    addActorSuccess,
    addActorError,
    editActorSuccess,
    editActorError,
    deleteActorSuccess,
    deleteActorError
} from './actions';

import { queryListActors, addActor, updateActor, deleteActor } from '../../repository/actor';

export function* watchGetListActor() {
    yield takeLatest(GET_ACTOR, handleGetListActor)
};

function* handleGetListActor({ payload }) {
    const selectedPageSize = payload.selectedPageSize;
    const currentPage = payload.currentPage;
    const selectedOrderOption = payload.selectedOrderOption;
    const search = payload.search;

    try {
        const listActor = yield call(queryListActors, selectedPageSize, currentPage, selectedOrderOption, search);
        // console.log(listActor);
        if (listActor !== undefined) {
            yield put(getListActorsSuccess(listActor))
        }
        else {
            yield put(getListActorError("Lõi rồi"))
        }
    } catch (error) {
        yield put(getListActorError(error))
    }
}

export function* watchAddActor() {
    yield takeLatest(ADD_ACTOR, handleAddActor)
}

function* handleAddActor({ payload }) {
    const actorForm = payload;
    // console.log(actorForm)
    try {
        const newActor = yield call(addActor, actorForm);
        console.log(newActor);
        if (newActor.success === "CREATED") {
            yield put(addActorSuccess(newActor.message))
        }
        else {
            yield put(addActorError(newActor.message))
        }
    } catch (error) {
        yield put(addActorError(error))
    }
}

export function* watchEditActor() {
    yield takeLatest(EDIT_ACTOR, handleEditActor)
}

function* handleEditActor({ payload }) {
    const actorForm = payload.actorForm;
    const id = payload.id;
    console.log(payload)
    try {
        const editActor = yield call(updateActor,id, actorForm);
        console.log(editActor);
        if (editActor.success === "OK") {
            yield put(editActorSuccess(editActor.message))
        }
        else {
            yield put(editActorError(editActor.message))
        }
    } catch (error) {
        yield put(editActorError(error))
    }
}

export function* watchDeleteActor() {
    yield takeLatest(DELETE_ACTOR, handleDeleteActor)
}

function* handleDeleteActor({ payload }) {
    const id = payload;
    console.log(id)
    try {
        const deleted = yield call(deleteActor, id);
        console.log(deleted);
        if (deleted.success === "OK") {
            yield put(deleteActorSuccess(deleted.message))
        }
        else {
            yield put(deleteActorError(deleted.message))
        }
    } catch (error) {
        yield put(deleteActorError(error))
    }
}

export default function* rootSaga() {
    yield all([
        fork(watchGetListActor),
        fork(watchAddActor),
        fork(watchEditActor),
        fork(watchDeleteActor),
    ]);
}