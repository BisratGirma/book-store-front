// HeroSection.js

import React from "react";
import styled from "styled-components";

const HeroContainer = styled.div`
  background-image: url("https://th.bing.com/th/id/OIP.95WmsdaMmGMRUKIAvk0PBAHaEG?rs=1&pid=ImgDetMain");
  background-color: #f5f5f5; /* Set your desired background color */
  height: 80vh; /* Adjust the height as needed */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  max-width: 400px; /* Adjust as needed */
  width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

const SearchButton = styled.button`
  background-color: #007bff; /* Set your desired button color */
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const HeroSection = ({
  setSeachKey,
}: {
  setSeachKey: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    // Handle search logic here
    setSeachKey(e.target.elements.search.value);
  };

  return (
    <HeroContainer>
      <SearchForm onSubmit={handleSearchSubmit}>
        <SearchInput type="text" placeholder="Search for books..." />
        <SearchButton type="submit">Search</SearchButton>
      </SearchForm>
    </HeroContainer>
  );
};

export default HeroSection;
