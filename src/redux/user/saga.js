import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
    GET_USER, GET_FAVORITE_LIST_BY_USER_ID, EDIT_USER, DELETE_USER,

} from "../actions";

import {
    getListUsersSuccess,
    getListUserError,
    getFavoriteListByUserIDSuccess,
    getFavoriteListByUserIDError,
    editUserSuccess,
    editUserError,

} from './actions';

import { queryListUsers, updateUser } from '../../repository/user';
import { queryListFavorites } from '../../repository/favorite'
export function* watchGetListUser() {
    yield takeLatest(GET_USER, handleGetListUser)
};

function* handleGetListUser({ payload }) {
    const selectedPageSize = payload.selectedPageSize;
    const currentPage = payload.currentPage;
    const selectedOrderOption = payload.selectedOrderOption;
    const search = payload.search;

    try {
        const listUser = yield call(queryListUsers, selectedPageSize, currentPage, selectedOrderOption, search);
        console.log(listUser);
        if (!listUser.message) {
            yield put(getListUsersSuccess(listUser))
        }
        else {
            yield put(getListUserError(listUser.message))
        }
    } catch (error) {
        yield put(getListUserError(error))
    }
}

export function* watchFavoriteListByUserID() {
    yield takeLatest(GET_FAVORITE_LIST_BY_USER_ID, handleGetFavoriteListByUserID)
};

function* handleGetFavoriteListByUserID({ payload }) {
    const id = payload
    try {
        const user = yield call(queryListFavorites, id);
        if (!user.message) {
            yield put(getFavoriteListByUserIDSuccess(user.result))
        }
        else {
            yield put(getFavoriteListByUserIDError(user.message))
        }
    } catch (error) {
        yield put(getFavoriteListByUserIDError(error))
    }
}

export function* watchEditUser() {
    yield takeLatest(EDIT_USER, handleEditUser)
}

function* handleEditUser({ payload }) {
    const userForm = payload
    console.log(payload)
    try {
        const editUser = yield call(updateUser, userForm);
        console.log(editUser);
        if (editUser.success === "OK") {
            yield put(editUserSuccess(editUser.message))
        }
        else {
            yield put(editUserError(editUser.message))
        }
    } catch (error) {
        yield put(editUserError(error))
    }
}

export default function* rootSaga() {
    yield all([
        fork(watchGetListUser),
        fork(watchEditUser),
        fork(watchFavoriteListByUserID),
    ]);
}