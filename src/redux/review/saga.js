import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
    GET_REVIEW, ADD_REVIEW, DELETE_REVIEW,
} from "../actions";

import {
    getListReviewsSuccess,
    getListReviewError,
    addReviewSuccess,
    addReviewError,
} from './actions';

import { queryListReviews, addReview } from '../../repository/review';

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

export default function* rootSaga() {
    yield all([
        fork(watchGetListReview),
        fork(watchAddReview),
    ]);
}