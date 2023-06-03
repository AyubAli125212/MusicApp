import { all } from 'redux-saga/effects';
import songSagas from './songSagas';

function* rootSaga() {
    yield all([
        songSagas(),
    ]);
}

export default rootSaga;
