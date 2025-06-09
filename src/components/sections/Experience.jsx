import React from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import styled from "styled-components";
import { experiences } from "../../data/constants";
import ExperienceCard from "../cards/ExperienceCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  background: ${({ theme }) => theme.bg || '#ffffff'}; /* Fallback to white for light mode */
  transition: background 0.3s ease;
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
  position: relative;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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

const Experience = () => (
  <Container id="Experience" className="shimmer">
    <Wrapper>
      <Title className="shimmer-title">Experience</Title>
      <Desc style={{ marginBottom: "40px" }}>
        My work experience as a software engineer across various companies and projects.
      </Desc>
      <VerticalTimeline>
        {experiences.map((experience, index) => (
          <ExperienceCard key={`experience-${index}`} experience={experience} />
        ))}
      </VerticalTimeline>
    </Wrapper>
  </Container>
);

export default Experience;