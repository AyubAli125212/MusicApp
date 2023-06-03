import { put, takeLatest, call } from 'redux-saga/effects';
import { fetchSongsAsync, createSongAsync, updateSongAsync, deleteSongAsync } from '../actions/songActions';
import { fetchSongs, createSong, updateSong, deleteSong } from '../../api/harmonyAPI';

// Fetch songs saga
function* fetchSongsSaga() {
    try {
        const songs = yield call(fetchSongs);
        yield put(fetchSongsAsync.fulfilled(songs));
    } catch (error) {
        yield put(fetchSongsAsync.rejected(error));
    }
}

// Create song saga
function* createSongSaga(action) {
    try {
        const newSong = yield call(createSong, action.payload);
        yield put(createSongAsync.fulfilled(newSong));
    } catch (error) {
        yield put(createSongAsync.rejected(error));
    }
}

// Update song saga
function* updateSongSaga(action) {
    try {
        const updatedSong = yield call(updateSong, action.payload);
        yield put(updateSongAsync.fulfilled(updatedSong));
    } catch (error) {
        yield put(updateSongAsync.rejected(error));
    }
}

// Delete song saga
function* deleteSongSaga(action) {
    try {
        yield call(deleteSong, action.payload);
        yield put(deleteSongAsync.fulfilled(action.payload));
    } catch (error) {
        yield put(deleteSongAsync.rejected(error));
    }
}

// Watcher saga
function* songSagas() {
    yield takeLatest(fetchSongsAsync.pending, fetchSongsSaga);
    yield takeLatest(createSongAsync.pending, createSongSaga);
    yield takeLatest(updateSongAsync.pending, updateSongSaga);
    yield takeLatest(deleteSongAsync.pending, deleteSongSaga);
}

export default songSagas;
