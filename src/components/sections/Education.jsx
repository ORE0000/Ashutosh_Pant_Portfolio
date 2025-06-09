import React, { useState, useEffect, useRef } from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import styled, { keyframes } from "styled-components";
import { education } from "../../data/constants";
import EducationCard from "../cards/EducationCard";
import EarthCanvas from "../canvas/Earth";

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 40px 20px;
  background: linear-gradient(
    180deg, 
    ${({ theme }) => theme.bg || '#ffffff'} 0%, 
    ${({ theme }) => theme.bg || '#ffffff'}95 50%, 
    transparent 100%
  );
  transition: all 0.3s ease;
  will-change: background; /* Optimize for background transitions */
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  background: linear-gradient(
    135deg, 
    ${({ theme }) => theme.text_primary || '#333333'} 0%, 
    ${({ theme }) => theme.primary || '#7877c6'} 50%, 
    ${({ theme }) => theme.text_primary || '#333333'} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${shimmer} 3s ease-in-out infinite;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(
      90deg, 
      ${({ theme }) => theme.primary || '#7877c6'}, 
      ${({ theme }) => theme.primary || '#7877c6'}80
    );
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary || '#666666'};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const EarthContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 40px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.5s ease;
`;

const Education = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Container id="Education" ref={containerRef}>
      <Wrapper>
        <Title>Education</Title>
        <Desc style={{ marginBottom: "40px" }}>
          My education has been a journey of self-discovery and growth. My
          educational details are as follows.
        </Desc>
        {isVisible && (
          <VerticalTimeline>
            {education.map((education, index) => (
              <EducationCard key={`education-${index}`} education={education} />
            ))}
          </VerticalTimeline>
        )}
        <EarthContainer isVisible={isVisible}>
          {isVisible && <EarthCanvas />}
        </EarthContainer>
      </Wrapper>
    </Container>
  );
};

export default Education;