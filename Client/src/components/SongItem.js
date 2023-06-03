import React from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSong, togglePlayPause } from '../redux/actions/songActions';

const CardContainer = styled.div`

  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 10px;
  margin:10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  position: relative;
  
`;

const CardImage = styled.img`
  width: 180px;
  height: 190px;
  object-fit: cover;
  border-radius: 4px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ImageContainer}:hover & {
    opacity: 1;
  }
`;

const PlayPauseButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
  font-size: 24px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Artist = styled.p`
  margin: 0;
  cursor: pointer;
  font-size: 0.8rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SongItem = ({ song }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.songs.isPlaying);
  const selectedSong = useSelector((state) => state.songs.selectedSong);
  const navigate = useNavigate();

  const handleSelected = () => {
    if (selectedSong !== song) {
      dispatch(setSelectedSong(song));
    }
    dispatch(togglePlayPause());
  };

  const handleClick = () => {
    navigate(`/songs/${song._id}`);
  };

  return (
    <div>
      <CardContainer>
        <ImageContainer>
          <CardImage src={song.coverImage.secure_url} alt={song.title} />
          <Overlay>
            <PlayPauseButton onClick={handleSelected}>
              {((selectedSong === song) && isPlaying) ? <FaPause /> : <FaPlay />}
            </PlayPauseButton>
          </Overlay>
        </ImageContainer>
        <Title onClick={handleClick}>{song.title}</Title>
        <Artist onClick={handleClick}>{song.artist}</Artist>
      </CardContainer>
    </div>
  );
};

export default SongItem;
