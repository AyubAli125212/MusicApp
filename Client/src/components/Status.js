import React from 'react';
import styled from '@emotion/styled/macro';

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StatusText = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #D8D8D8;
  text-align: center;
  animation: fadeIn 1s ease;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Status = ({ text }) => {
  return (
    <StatusContainer>
      <StatusText>{text}</StatusText>
    </StatusContainer>
  );
};

export default Status;
