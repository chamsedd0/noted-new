"use client";

import styled from "styled-components";

const SearchContainer = styled.div`
  position: relative;
  flex: 1;

  img {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    color: #aaa;
    font-size: 16px;
    pointer-events: none;
  }
`;

const SearchInput = styled.input`
  width: 70%;
  padding: 10px 15px 10px 46px;
  min-height: 40px;
  border: none;
  border-radius: 25px;
  background-color: #4a4a4a;
  color: #bcbcbc;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    width: 70%;
  }

  &:hover {
    width: 70%;
  }

  &::placeholder {
    color: #a3a3a3; /* Placeholder color */
    font-weight: 500;
  }
`;

const SearchBarComponent = () => {

  return (
    <SearchContainer>
      <img src="/search.svg"></img>
      <SearchInput
        type="text"
        placeholder="Search"
      />
    </SearchContainer>
  );
};

export default SearchBarComponent;
