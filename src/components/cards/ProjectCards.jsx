import React, { useState, useEffect, memo } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Modern card hover animation
const cardHover = keyframes`
  0% {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px);
  }
  100% {
    transform: perspective(1000px) rotateX(-5deg) rotateY(5deg) translateZ(30px);
  }
`;

// Sophisticated shimmer effect
const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

// Floating animation for buttons
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

// Pulse animation for tags
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 380px;
  height: 520px;
  background: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 24px;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: perspective(1000px) translateZ(0);
  position: relative;
  border: 1px solid ${({ theme }) => theme.primary + "10"};
  will-change: transform, box-shadow; /* Optimize for animation */
  
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
    transition: left 0.6s ease;
    z-index: 1;
  }
  
  &:hover {
    transform: perspective(1000px) rotateX(-5deg) rotateY(5deg) translateZ(30px);
    box-shadow: 
      0 25px 60px rgba(0, 0, 0, 0.15),
      0 8px 20px rgba(0, 0, 0, 0.1),
      0 0 0 1px ${({ theme }) => theme.primary + "20"};
    
    &::before {
      left: 100%;
    }
  }
  
  &:hover ${props => Button} {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
    height: 480px;
    padding: 20px;
    gap: 14px;
    border-radius: 20px;
    
    &:hover {
      transform: perspective(1000px) translateZ(10px) scale(1.02);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.primary + "10"};
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    pointer-events: none;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${Card}:hover & {
    transform: scale(1.1) rotate(2deg);
  }
  
  @media (max-width: 768px) {
    ${Card}:hover & {
      transform: scale(1.05);
    }
  }
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
  position: relative;
  z-index: 2;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary + "15"},
    ${({ theme }) => theme.primary + "25"}
  );
  padding: 6px 12px;
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.primary + "20"};
  
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
      ${({ theme }) => theme.primary + "30"},
      transparent
    );
    transition: left 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    background: ${({ theme }) => theme.primary + "25"};
    box-shadow: 0 4px 12px ${({ theme }) => theme.primary + "30"};
    
    &::before {
      left: 100%;
    }
  }
  
  ${Card}:hover & {
    animation: ${pulse} 2s ease-in-out infinite;
    animation-delay: calc(var(--index, 0) * 0.1s);
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 4px;
  flex: 1;
  position: relative;
  z-index: 2;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  line-height: 1.3;
  margin: 0;
  transition: color 0.3s ease;
  
  ${Card}:hover & {
    color: ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Date = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.8;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.p`
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  opacity: 0.9;
  overflow: hidden;
  displayательно
System: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  line-height: 1.5;
  margin: 8px 0 0 0;
  
  @media (max-width: 768px) {
    font-size: 14px;
    -webkit-line-clamp: 2;
  }
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  position: relative;
  z-index: 2;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: ${({ index }) => index === 0 ? '0' : '-12px'};
  background: ${({ theme }) => theme.white};
  box-shadow: 
    0 0 0 3px ${({ theme }) => theme.card},
    0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: ${({ index }) => 10 - index};
  
  &:hover {
    transform: translateY(-4px) scale(1.1);
    z-index: 20;
    box-shadow: 
      0 0 0 3px ${({ theme }) => theme.primary + "30"},
      0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    margin-left: ${({ index }) => index === 0 ? '0' : '-10px'};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px 20px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.primary}CC
  );
  color: ${({ theme }) => theme.white || theme.text_primary};
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px ${({ theme }) => theme.primary + "40"};
  
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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.primary + "60"};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 13px;
  }
`;

const ProjectCards = ({ project, setOpenModal, animationIndex = 0, isVisible = false }) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isVisible || !project) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const cardId = `project-card-${project.id || project.title || animationIndex}-${animationIndex}`;
    const card = document.getElementById(cardId);
    if (card) observer.observe(card);

    return () => observer.disconnect();
  }, [isVisible, project, animationIndex]);

  if (!project) {
    return null; // Skip rendering if project is undefined
  }

  return (
    <Card
      id={`project-card-${project.id || project.title || animationIndex}-${animationIndex}`}
      onClick={() => setOpenModal({ state: true, project })}
      style={{ opacity: isInView ? 1 : 0 }}
    >
      <ImageContainer>
        <Image 
          src={project.image}
          alt={project.title || 'Project'}
          loading="lazy"
        />
      </ImageContainer>
      
      <Tags>
        {project.tags?.map((tag, index) => (
          <Tag 
            key={index} 
            style={{ '--index': index }}
          >
            {tag}
          </Tag>
        ))}
      </Tags>
      
      <Details>
        <Title>{project.title || 'Untitled Project'}</Title>
        <Date>{project.date || 'No Date'}</Date>
        <Description>{project.description || 'No description available.'}</Description>
      </Details>
      
      {project.member && project.member.length > 0 && (
        <Members>
          {project.member.map((member, index) => (
            <Avatar 
              key={index} 
              src={member.img} 
              alt={member.name || `Member ${index + 1}`}
              index={index}
              loading="lazy"
            />
          ))}
        </Members>
      )}
      
      <Button>
        View Project Details
      </Button>
    </Card>
  );
};

export default memo(ProjectCards);