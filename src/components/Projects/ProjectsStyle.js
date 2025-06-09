import styled, { keyframes, css } from 'styled-components';

// Modern slide-up animation with elastic effect
const slideUpElastic = keyframes`
  0% {
    opacity: 0;
    transform: translateY(60px) scale(0.8) rotateX(15deg);
  }
  60% {
    opacity: 0.8;
    transform: translateY(-10px) scale(1.05) rotateX(-2deg);
  }
  80% {
    opacity: 0.95;
    transform: translateY(5px) scale(0.98) rotateX(1deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1) rotateX(0deg);
  }
`;

// Floating animation for active buttons
const float = keyframes`
  0%, 100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-3px) scale(1.02);
  }
`;

// Pulse animation with modern glow effect
const pulseGlow = keyframes`
  0% {
    box-shadow: 
      0 0 0 0 ${({ theme }) => theme.primary + "40"},
      0 4px 20px rgba(0, 0, 0, 0.1);
  }
  50% {
    box-shadow: 
      0 0 0 8px ${({ theme }) => theme.primary + "20"},
      0 8px 25px rgba(0, 0, 0, 0.15);
  }
  100% {
    box-shadow: 
      0 0 0 0 ${({ theme }) => theme.primary + "00"},
      0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

// Shimmer effect for loading states
const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const Container = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.gradientStart} 0%,
    ${({ theme }) => theme.gradientMid} 50%,
    ${({ theme }) => theme.gradientEnd || theme.gradientStart} 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, ${({ theme }) => theme.primary + "10"} 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, ${({ theme }) => theme.secondary || theme.primary}15 0%, transparent 50%);
    pointer-events: none;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  padding: 40px 20px 120px 20px;
  gap: 20px;
  
  @media (max-width: 960px) {
    padding: 30px 15px 100px 15px;
    gap: 15px;
  }
`;

export const Title = styled.div`
  font-size: clamp(28px, 5vw, 48px);
  text-align: center;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.text_primary} 0%,
    ${({ theme }) => theme.primary} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 20px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.primary},
      transparent
    );
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    margin-top: 15px;
    &::after {
      width: 60px;
      height: 3px;
    }
  }
`;

export const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 650px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 16px;
    max-width: 90%;
    line-height: 1.5;
  }
`;

export const ToggleButtonGroup = styled.div`
  display: flex;
  background: ${({ theme }) => theme.card_light + "20"};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 6px;
  font-size: 16px;
  font-weight: 600;
  margin: 30px 0px 40px 0px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.primary + "20"};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.primary + "10"},
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    border-radius: 16px;
    padding: 4px;
    margin: 25px 0px 35px 0px;
    flex-wrap: wrap;
    gap: 4px;
  }
`;

export const ToggleButton = styled.div`
  padding: 12px 24px;
  border-radius: 16px;
  cursor: pointer;
  color: ${({ theme, active }) => 
    active ? theme.white || theme.text_primary : theme.text_secondary};
  background: ${({ theme, active }) =>
    active 
      ? `linear-gradient(135deg, ${theme.primary}, ${theme.primary}CC)` 
      : "transparent"};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(1);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  
  ${({ active }) =>
    active &&
    css`
      animation: ${float} 3s ease-in-out infinite;
      box-shadow: 
        0 4px 20px ${({ theme }) => theme.primary + "40"},
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.3s ease;
  }
  
  &:hover {
    transform: scale(1.05) translateY(-2px);
    background: ${({ theme, active }) =>
      active 
        ? `linear-gradient(135deg, ${theme.primary}, ${theme.primary}EE)` 
        : theme.primary + "15"};
    color: ${({ theme }) => theme.text_primary};
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: scale(0.98) translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 10px 16px;
    border-radius: 12px;
    font-size: 12px;
    flex: 1;
    text-align: center;
    min-width: 0;
  }
`;

export const Divider = styled.div`
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    ${({ theme }) => theme.text_secondary + "30"},
    transparent
  );
  margin: 8px 2px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  will-change: transform, opacity; /* Optimize for animation */
  
  & > * {
    animation: ${slideUpElastic} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
    transform: translateY(60px) scale(0.8);
  }
  
  ${({ isAnimating }) =>
    isAnimating &&
    css`
      & > * {
        animation-play-state: running;
      }
    `}
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    padding: 0 10px;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;