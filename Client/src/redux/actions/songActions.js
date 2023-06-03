import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { fetchSongs, createSong, updateSong, deleteSong } from '../../api/harmonyAPI';

// Fetch songs
export const fetchSongsAsync = createAsyncThunk('songs/fetchSongs', async () => {
    const songs = await fetchSongs();
    return songs;
});

// Create a new song
export const createSongAsync = createAsyncThunk('songs/createSong', async (songData) => {
    const newSong = await createSong(songData);
    return newSong;
});

// Update an existing song
export const updateSongAsync = createAsyncThunk('songs/updateSong', async (songData) => {
    const updatedSong = await updateSong(songData);
    return updatedSong;
});

// Delete a song
export const deleteSongAsync = createAsyncThunk('songs/deleteSong', async (songId) => {
    await deleteSong(songId);
    return songId;
});

export const setSelectedSong = createAction('songs/setSelectedSong');
export const togglePlayPause = createAction('songs/togglePlayPause');