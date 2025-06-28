import React from "react";
import styled from "styled-components";
import logo from "../img/logo-bitA.png";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0 24px;
  height: 56px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
`;
const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;
const LogoImg = styled.img`
  height: 28px;
  margin-right: 8px;
`;

const MenuIcon = styled.div`
  font-size: 2rem;
  cursor: pointer;
  margin-left: 24px;
`;

const Header = () => (
  <HeaderContainer>
    <LogoSection>
      <LogoImg src={logo} alt="bitA logo" />
    </LogoSection>

    <MenuIcon>☰</MenuIcon>
  </HeaderContainer>
);

export default Header;