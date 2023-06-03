import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled/macro';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Status from './Status';
import { deleteSongAsync } from '../redux/actions/songActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SongDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SongImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SongTitle = styled.h2`
color:#fff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SongArtist = styled.p`
color:#fff;
  font-size: 18px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const UpdateButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a71d2a;
  }
`;

const SongDetail = () => {
  const dispatch = useDispatch();
  const successMessageDisplayed = useRef(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const songs = useSelector((state) => state.songs.songs);
  const song = songs.find((song) => song._id === id);

  const status = useSelector((state) => state.songs.status);

  useEffect(() => {
    if (status === 201 && !successMessageDisplayed.current) {
      toast.success('Music Updated successfully!', { autoClose: 3000 });
    } else if (status === 500 && !successMessageDisplayed.current) {
      toast.error(`Error updating music 😌`, { autoClose: 3000 });
    }
    return () => {
      if (status === 201) {
        successMessageDisplayed.current = true;
      }
    };
  }, [status]);

  if (!song) {
    return <Status />;
  }

  const handleDelete = () => {
    dispatch(deleteSongAsync(id));
    navigate('/')
  }
  return (
    <div>
      <SongDetailContainer>
        <SongImage src={song.coverImage.secure_url} alt={song.title} />
        <SongTitle>{song.title}</SongTitle>
        <SongArtist>{song.artist}</SongArtist>
        <ButtonContainer>
          <UpdateButton onClick={() => { navigate(`/songs/update/${id}`) }}>Update</UpdateButton>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </ButtonContainer>
      </SongDetailContainer>
      <ToastContainer />
    </div>
  );
};

export default SongDetail;
