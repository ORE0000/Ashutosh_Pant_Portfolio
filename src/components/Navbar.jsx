import React, { useState } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Bio } from "../data/constants";
import { MenuRounded, Brightness4, Brightness7 } from "@mui/icons-material";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

export const NavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  @media screen and (max-width: 768px) {
    width: 60%;
  }
  @media screen and (max-width: 640px) {
    padding: 0 0px;
  }
`;

export const Span = styled.div`
  display: flex;
  align-items: center;
  font-size: 22px;

  .bracket {
    color: ${({ theme }) => theme.primary};
    font-size: 35px;
    font-weight: 600;
    margin: -2px;
  }

  .name {
    font-weight: 500;
    margin: 0 4px;
  }

  .divider {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
    font-size: 24px;
    margin: 0 4px;
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
    .bracket {
      font-size: 28px;
    }
    .divider {
      font-size: 20px;
    }
  }
  @media screen and (max-width: 640px) {
    font-size: 16px;
    .bracket {
      font-size: 24px;
    }
    .divider {
      font-size: 18px;
    }
  }
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  gap: 12px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const ThemeToggleButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  border-radius: 20px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
  @media screen and (max-width: 768px) {
    padding: 6px;
    svg {
      font-size: 20px;
    }
  }
  @media screen and (max-width: 640px) {
    padding: 4px;
    svg {
      font-size: 18px;
    }
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  display: none;
  gap: 10px;
  padding-right: 4px;
  @media screen and (max-width: 768px) {
    display: flex;
  }
  @media screen and (max-width: 640px) {
    gap: 8px;
    svg {
      font-size: 22px;
    }
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
  @media screen and (max-width: 640px) {
    padding: 12px 20px 24px 20px;
  }
`;

const Navbar = ({ toggleTheme, currentTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">
          <Span>
            <div className="bracket">&lt;</div>
            <span className="name">Ashutosh</span>
            <div className="divider">/</div>
            <span className="name">Pant</span>
            <div className="bracket">&gt;</div>
          </Span>
        </NavLogo>

        <MobileIcon>
          <ThemeToggleButton onClick={toggleTheme}>
            {currentTheme.bg === "#090917" ? <Brightness7 /> : <Brightness4 />}
          </ThemeToggleButton>
          <MenuRounded
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: "inherit" }}
          />
        </MobileIcon>

        <NavItems>
          <NavLink href="#About">About</NavLink>
          <NavLink href="#Skills">Skills</NavLink>
          <NavLink href="#Experience">Experience</NavLink>
          <NavLink href="#Projects">Projects</NavLink>
          <NavLink href="#Education">Education</NavLink>
        </NavItems>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#About">
              About
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Skills">
              Skills
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Experience">
              Experience
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Projects">
              Projects
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Education">
              Education
            </NavLink>
            <GithubButton
              href={Bio.github}
              target="_Blank"
              style={{
                background: theme.primary,
                color: theme.text_primary,
              }}
            >
              Github Profile
            </GithubButton>
          </MobileMenu>
        )}

        <ButtonContainer>
          <ThemeToggleButton onClick={toggleTheme}>
            {currentTheme.bg === "#090917" ? <Brightness7 /> : <Brightness4 />}
          </ThemeToggleButton>
          <GithubButton href={Bio.github} target="_Blank">
            Github Profile
          </GithubButton>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;