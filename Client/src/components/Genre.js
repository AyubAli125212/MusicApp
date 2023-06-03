import React from 'react';
import styled from '@emotion/styled/macro';
import { FiChevronDown } from 'react-icons/fi';

const GenreContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 10px;
  height:50px
`;

const GenreButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;

const DropdownIcon = styled(FiChevronDown)`
  margin-left: 5px;
`;

const GenreDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const GenreItem = styled.div`
  padding: 4px 0;
  cursor: pointer;
  
  &:hover {
    color: #007bff;
  }
`;

const Genre = ({ genres, selectedGenre, handleGenreChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (genre) => {
    handleGenreChange(genre);
    setIsOpen(false);
  };

  return (
    <GenreContainer>
      <GenreButton onClick={toggleDropdown}>
        {selectedGenre ? selectedGenre : 'All Genres'}
        <DropdownIcon />
      </GenreButton>
      {isOpen && (
        <GenreDropdown>
          {genres.map((genre) => (
            <GenreItem key={genre} onClick={() => handleItemClick(genre)}>
              {genre}
            </GenreItem>
          ))}
        </GenreDropdown>
      )}
    </GenreContainer>
  );
};

export default Genre;
