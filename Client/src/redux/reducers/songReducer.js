import { createReducer } from '@reduxjs/toolkit';
import { fetchSongsAsync, createSongAsync, updateSongAsync, deleteSongAsync, setSelectedSong, togglePlayPause } from '../actions/songActions';

const initialState = {
    songs: [],
    selectedSong: null,
    isLoading: false,
    error: null,
    isPlaying: false,
    status: null,
};

const songReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchSongsAsync.pending, (state) => {
            state.isLoading = true;
            state.status = 0;
            state.error = null;
        })
        .addCase(fetchSongsAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.songs = action.payload;
            state.error = null;
        })
        .addCase(fetchSongsAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(createSongAsync.pending, (state) => {
            state.error = null;
            state.status = 0;
        })
        .addCase(createSongAsync.fulfilled, (state, action) => {
            state.status = action.payload;
        })
        .addCase(createSongAsync.rejected, (state, action) => {
            state.status = action.payload;
        })
        .addCase(updateSongAsync.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.status = 0;
        })
        .addCase(updateSongAsync.fulfilled, (state, action) => {
            const updatedSongData = action.payload;
            const updatedSong = updatedSongData.data;
            state.status = updatedSongData.status;

            if (updatedSongData.status === 201) {
                const index = state.songs.findIndex((song) => song._id === updatedSong._id);
                if (index !== -1) {
                    state.songs[index] = updatedSong;
                }
            }

            state.isLoading = false;
        })
        .addCase(updateSongAsync.rejected, (state, action) => {
            state.status = action.payload;
            state.isLoading = false;
        })
        .addCase(deleteSongAsync.fulfilled, (state, action) => {
            const deletedSongId = action.payload;
            state.songs = state.songs.filter((song) => song.id !== deletedSongId);
        })
        .addCase(setSelectedSong, (state, action) => {
            state.selectedSong = action.payload;
        })
        .addCase(togglePlayPause, (state) => {
            state.isPlaying = !state.isPlaying;
        });

});

export default songReducer;
