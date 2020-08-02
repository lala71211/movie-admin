import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
    GET_REVIEW, ADD_REVIEW, DELETE_REVIEW, DELETE_REVIEW_MANY
} from "../actions";

import {
    getListReviewsSuccess,
    getListReviewError,
    addReviewSuccess,
    addReviewError,
    deleteReviewSuccess,
    deleteReviewError,
} from './actions';

import { queryListReviews, addReview, deleteReview, deleteManyReviews } from '../../repository/review';

export function* watchGetListReview() {
    yield takeLatest(GET_REVIEW, handleGetListReview)
};

function* handleGetListReview({ payload }) {
    const selectedPageSize = payload.selectedPageSize;
    const currentPage = payload.currentPage;
    const movieId = payload.movieId;
    const userId = payload.userId;

    try {
        const listReview = yield call(queryListReviews, selectedPageSize, currentPage, movieId, userId);
        // console.log(listReview);
        if (listReview !== undefined) {
            yield put(getListReviewsSuccess(listReview))
        }
        else {
            yield put(getListReviewError("Lỗi rồi"))
        }
    } catch (error) {
        yield put(getListReviewError(error))
    }
}

export function* watchAddReview() {
    yield takeLatest(ADD_REVIEW, handleAddReview)
};

function* handleAddReview({ payload }) {
    const reviewForm = payload;
    // console.log(reviewForm)
    try {
        const newReview = yield call(addReview, reviewForm);
        // console.log(newReview);
        if (newReview.success === "CREATED") {
            yield put(addReviewSuccess(newReview.message))
        }
        else {
            yield put(addReviewError(newReview.message))
        }
    } catch (error) {
        yield put(addReviewError(error))
    }
}

export function* watchDeleteReview() {
    yield takeLatest(DELETE_REVIEW, handleDeleteReview)
}

function* handleDeleteReview({ payload }) {
    const id = payload;
    console.log(id)
    try {
        const deleted = yield call(deleteReview, id);
        console.log(deleted);
        if (deleted.success === "OK") {
            yield put(deleteReviewSuccess(deleted.message))
        }
        else {
            yield put(deleteReviewError(deleted.message))
        }
    } catch (error) {
        yield put(deleteReviewError(error))
    }
}


export function* watchDeleteManyReviews() {
    yield takeLatest(DELETE_REVIEW_MANY, handleDeleteManyReviews)
}

function* handleDeleteManyReviews({ payload }) {
    const listId = payload;
    console.log(listId)
    try {
        const deleted = yield call(deleteManyReviews, listId);
        console.log(deleted);
        if (deleted.success === "OK") {
            yield put(deleteReviewSuccess(deleted.message))
        }
        else {
            yield put(deleteReviewError(deleted.message))
        }
    } catch (error) {
        yield put(deleteReviewError(error))
    }
}

export default function* rootSaga() {
    yield all([
        fork(watchGetListReview),
        fork(watchAddReview),
        fork(watchDeleteReview),
        fork(watchDeleteManyReviews)
    ]);
}