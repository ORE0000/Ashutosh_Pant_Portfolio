import React from "react";
import styled, { keyframes } from "styled-components";
import { Bio } from "../../data/constants";
import { FacebookRounded, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  padding: 4rem 0 2rem;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 10;
  background: transparent;
  transition: all 0.5s ease-in-out;
  margin-top: -120px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      transparent 40%,
      ${({ theme }) => theme.footerBackground + 'F0'} 100%
    );
    z-index: -1;
    clip-path: polygon(
      0 0,
      15% 15%,
      25% 10%,
      35% 20%,
      45% 15%,
      55% 25%,
      65% 15%,
      75% 20%,
      85% 10%,
      95% 15%,
      100% 0,
      100% 100%,
      0 100%
    );
  }
`;

const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  padding: 2rem 1.5rem;
  color: ${({ theme }) => theme.text_primary};
  position: relative;
  z-index: 1;
  background: transparent;
  box-shadow: none;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 1.75rem;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.text_primary} 0%, 
    ${({ theme }) => theme.primary} 50%, 
    ${({ theme }) => theme.text_primary} 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${shimmer} 3s ease-in-out infinite;
  letter-spacing: 0.05em;
  transition: transform 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primary + '80'});
    border-radius: 1px;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const Nav = styled.ul`
  width: 100%;
  max-width: 900px;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  justify-content: center;
  list-style: none;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1.5rem;
    font-size: 0.9rem;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease-in-out;
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.text_secondary});
    transition: width 0.3s ease-in-out;
  }
  &:hover {
    color: ${({ theme }) => theme.primary};
    &:after {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1.5rem;
  gap: 1.5rem;
`;

const SocialMediaIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.card_light + 'CC'};
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.6rem;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background: linear-gradient(45deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.text_primary});
    color: ${({ theme }) => theme.bg};
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Copyright = styled.p`
  margin-top: 2rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  opacity: 0.85;
  letter-spacing: 0.02em;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>Ashutosh Pant</Logo>
        <Nav>
          <NavLink href="#About">About</NavLink>
          <NavLink href="#Skills">Skills</NavLink>
          <NavLink href="#Experience">Experience</NavLink>
          <NavLink href={Bio.projects} target="_blank">Projects</NavLink>
          <NavLink href="#Education">Education</NavLink>
        </Nav>
        <SocialMediaIcons>
          <SocialMediaIcon href={Bio.facebook} target="_blank">
            <FacebookRounded />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.twitter} target="_blank">
            <Twitter />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.linkedin} target="_blank">
            <LinkedIn />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.insta} target="_blank">
            <Instagram />
          </SocialMediaIcon>
        </SocialMediaIcons>
        <Copyright>© 2025 Ashutosh Pant. All rights reserved.</Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;