import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
    GET_COMMENT, DELETE_COMMENT,
} from "../actions";

import {
    getListCommentsSuccess,
    getListCommentError,
    deleteCommentSuccess,
    deleteCommentError,
} from './actions';

import { queryListComments,deleteComment,deleteManyComments} from '../../repository/comment';

export function* watchGetListComment() {
    yield takeLatest(GET_COMMENT, handleGetListComment)
};

function* handleGetListComment({ payload }) {
    const selectedPageSize = payload.selectedPageSize;
    const currentPage = payload.currentPage;
    const movieId = payload.movieId;
    const userId = payload.userId;

    try {
        const listComment = yield call(queryListComments, selectedPageSize, currentPage, movieId, userId);
        // console.log(ListComment);
        if (!listComment.message) {
            yield put(getListCommentsSuccess(listComment))
        }
        else {
            yield put(getListCommentError(listComment.message))
        }
    } catch (error) {
        yield put(getListCommentError(error))
    }
}

export function* watchDeleteComment() {
    yield takeLatest(DELETE_COMMENT, handleDeleteComment)
}

function* handleDeleteComment({ payload }) {
    const id = payload;
    console.log(id)
    try {
        const deleted = yield call(deleteComment, id);
        console.log(deleted);
        if (deleted.success === "OK") {
            yield put(deleteCommentSuccess(deleted.message))
        }
        else {
            yield put(deleteCommentError(deleted.message))
        }
    } catch (error) {
        yield put(deleteCommentError(error))
    }
}


export function* watchDeleteManyComments() {
    yield takeLatest(DELETE_COMMENT, handleDeleteManyComments)
}

function* handleDeleteManyComments({ payload }) {
    const listId = payload;
    console.log(listId)
    try {
        const deleted = yield call(deleteManyComments, listId);
        console.log(deleted);
        if (deleted.success === "OK") {
            yield put(deleteCommentSuccess(deleted.message))
        }
        else {
            yield put(deleteCommentError(deleted.message))
        }
    } catch (error) {
        yield put(deleteCommentError(error))
    }
}


export default function* rootSaga() {
    yield all([
        fork(watchGetListComment),
        fork(watchDeleteComment),
        fork(watchDeleteManyComments)
    ]);
}