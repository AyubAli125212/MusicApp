import axios from 'axios';

const API_BASE_URL = 'http://localhost:5050/harmony';

export const fetchSongs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/`);
        return response.data;
    } catch (error) {

        console.error('Error fetching songs:', error);
    }
};

export const createSong = async (songData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/`, songData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.status;
    } catch (error) {
        console.error('Error creating song:', error);
        return error.response.status;
    }
};

export const updateSong = async (songData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/`, songData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.error('Error updating song:', error);
        return error.response.status;
    }
};

export const deleteSong = async (songId) => {
    try {
        await axios.delete(`${API_BASE_URL}/${songId}`);

    } catch (error) {
        console.error('Error deleting song:', error);
    }
};