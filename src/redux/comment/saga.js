import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
    GET_COMMENT, DELETE_COMMENT,
} from "../actions";

import {
    getListCommentsSuccess,
    getListCommentError,
} from './actions';

import { queryListComments,} from '../../repository/comment';

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

export default function* rootSaga() {
    yield all([
        fork(watchGetListComment),
    ]);
}