import React from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';
import logo2 from '../assets/images/logo2.png';

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  z-index: 1; /* Ensure the navbar stays on top */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background: linear-gradient(
    to right,
    #5276c9,,
    #152138
  );

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.img`
  width: 95px;
  height: 70px;
`;

const AppTitle = styled.h1`
  font-size: 20px;
  margin: 0;
  color:#fff
`;

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <NavbarContainer>
      <LogoContainer onClick={() => { navigate('/') }}>
        <Logo src={logo2} alt="HarmonyPlay Logo" />
        <AppTitle>HarmonyPlay</AppTitle>
      </LogoContainer>
    </NavbarContainer>
  );
};

export default Navbar;
