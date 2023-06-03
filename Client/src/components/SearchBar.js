import React, { useState } from 'react';
import styled from '@emotion/styled/macro';

const SearchBarContainer = styled.div`
  margin-bottom: 20px;
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchBarInput = styled.input`
  padding: 15px;
  width: 300px;
  height: 50px;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  transition: width 0.3s ease;

  &:focus {
    width: 400px;
    outline: none;
  }

  @media (max-width: 768px) {
    width: 90%;
    &:focus {
      width: 100%;
      outline: none;
    }
  }
`;

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <SearchBarContainer>
      <SearchBarInput
        type="text"
        placeholder="Search by title or artist"
        value={searchTerm}
        onChange={handleChange}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
