import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styled from '@emotion/styled/macro';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlayPause } from '../redux/actions/songActions';

const MusicPlayerContainer = styled.div`
  width: 100%;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:10px;
`;

const MusicPlayer = () => {
    const dispatch = useDispatch();
    const isPlaying = useSelector((state) => state.songs.isPlaying);
    const selectedSong = useSelector((state) => state.songs.selectedSong);

    const handlePlay = () => {
        dispatch(togglePlayPause());
    };

    const handlePause = () => {
        dispatch(togglePlayPause());
    };

    return (
        <MusicPlayerContainer>
            <AudioPlayer
                autoPlay={selectedSong && isPlaying}
                src={selectedSong.file.secure_url}
                onPause={handlePause}
                onPlay={handlePlay}
                volume={0.5}
            />
        </MusicPlayerContainer>
    );
};

export default MusicPlayer;