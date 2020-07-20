import { all } from 'redux-saga/effects';
import genreSaga from './genre/saga';
import actocSaga from './actor/saga';

export default function* rootSaga(getState) {
  yield all([
    genreSaga(),
    actocSaga(),
  ]);
}
