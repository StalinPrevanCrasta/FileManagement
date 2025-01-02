import styled, { keyframes, createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #121212;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const NavbarWrapper = styled.div`
  background-color: #1f1f1f;
  padding: 1rem;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  margin-bottom: 1.5rem;
  border-radius: 8px;
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const SubBarWrapper = styled.div`
  background-color: #333;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 1s ease-in-out;
`;

export const Button = styled.button`
  background-color: #ff6f61;
  border: none;
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.4s ease;
  box-shadow: 0 8px 15px rgba(255, 111, 97, 0.4);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 10px 20px rgba(255, 111, 97, 0.6);
  }
`;

export const Card = styled.div`
  background-color: #1e3a8a;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  color: #fff;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  box-shadow: 0 4px 15px rgba(30, 58, 138, 0.4);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(30, 58, 138, 0.6);
  }
`;

const moveText = keyframes`
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0); }
  100% { transform: translateX(100%); }
`;

export const MovingText = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 2rem 0;
  color: #ff6f61;
  animation: ${moveText} 5s linear infinite;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

