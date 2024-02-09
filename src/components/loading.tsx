// LoadingSpinner.js
import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframe animation for rotation
const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin-top: 20px;
`;

const Spinner = styled.div`
  border: 4px solid #3b5998; /* Facebook blue color */
  border-top: 4px solid transparent;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default LoadingSpinner;
