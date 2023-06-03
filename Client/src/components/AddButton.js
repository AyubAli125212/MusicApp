import React from 'react';
import styled from '@emotion/styled/macro';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddButtonContainer = styled.div`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-image: linear-gradient(to left bottom, #00f41f, #00d095, #00a5bc, #0075a4, #3e4a62);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: -1;
  }

  .plus-icon {
    animation: rotate 3s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const PlusIcon = styled(FaPlus)`
  color: #fff;
  font-size: 24px;
`;

const AddButton = () => {
    const navigate = useNavigate();

    return (
        <AddButtonContainer title="Add Music" onClick={() => navigate('/songs/create')}>
            <PlusIcon className="plus-icon" />
        </AddButtonContainer>
    );
};

export default AddButton;
