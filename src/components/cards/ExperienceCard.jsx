import React, { memo } from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import styled, { useTheme, keyframes } from 'styled-components';

const cardHover = keyframes`
  0% {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px);
  }
  100% {
    transform: perspective(1000px) rotateX(-3deg) rotateY(3deg) translateZ(20px);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const reveal = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${({ theme }) => theme.card + 'cc'};
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.text_primary + '20'};
  border-radius: 12px;
  transform: perspective(1000px) translateZ(0);
  padding: 16px;
  will-change: transform, box-shadow; /* Optimize for animation */
  
  &:hover {
    transform: perspective(1000px) rotateX(-3deg) rotateY(3deg) translateZ(20px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1), 0 0 0 1px ${({ theme }) => theme.primary + '20'};
  }
  
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
      rgba(120, 119, 198, 0.15),
      transparent
    );
    transition: left 0.6s ease;
    z-index: 1;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  max-width: 100%;
  gap: 12px;
  padding-bottom: 12px;
`;

const Image = styled.img`
  height: 60px;
  border-radius: 12px;
  margin-top: 4px;
  transition: filter 0.4s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  
  ${Container}:hover & {
    filter: drop-shadow(0 0 12px rgba(120, 119, 198, 0.8));
  }
  
  @media only screen and (max-width: 768px) {
    height: 48px;
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Role = styled.div`
  font-size: 22px;
  font-weight: 800;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, ${({ theme }) => theme.text_primary} 0%, ${({ theme }) => theme.primary} 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
  letter-spacing: -0.5px;
  line-height: 1.3;
  @media only screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const Company = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  font-family: 'Inter', sans-serif;
  opacity: 0;
  animation: ${reveal} 0.5s ease forwards;
  animation-delay: 0.2s;
  line-height: 1.4;
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const DateText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + '80'};
  font-family: 'Inter', sans-serif;
  opacity: 0;
  animation: ${reveal} 0.5s ease forwards;
  animation-delay: 0.3s;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  font-family: 'Inter', sans-serif;
  margin-bottom: 12px;
  padding: 0 8px;
  opacity: 0;
  animation: ${reveal} 0.5s ease forwards;
  animation-delay: 0.4s;
  line-height: 1.5;
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Skills = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  padding: 0 8px;
  opacity: 0;
  animation: ${reveal} 0.5s ease forwards;
  animation-delay: 0.5s;
`;

const Span = styled.div`
  display: -webkit-box;
  max-width: 100%;
`;

const Skill = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  font-family: 'Inter', sans-serif;
  @media only screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ExperienceCard = ({ experience }) => {
  const theme = useTheme();

  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          alt={experience?.company}
          style={{ borderRadius: "50%", objectFit: "cover", transition: "filter 0.4s ease" }}
          src={experience?.img}
          loading="lazy" // Lazy load images
        />
      }
      contentStyle={{
        background: "transparent",
        border: "none",
        boxShadow: "none",
      }}
      contentArrowStyle={{
        borderRight: '7px solid #800080', // Purple color for timeline line
        transition: 'border-right-color 0.3s ease',
      }}
      date={experience?.date}
      dateClassName="vertical-timeline-element-date" // Ensure date is styled
    >
      <Container>
        <Top>
          <Image src={experience?.img} loading="lazy" />
          <Body>
            <Role>{experience?.role}</Role>
            <Company>{experience?.company}</Company>
            <DateText>{experience?.date}</DateText>
          </Body>
        </Top>
        <Description>
          {experience?.desc && <Span>{experience.desc}</Span>}
          {experience?.skills && (
            <>
              <br />
              <Skills>
                <b>Skills:</b>
                <ItemWrapper>
                  {experience?.skills?.map((skill, index) => (
                    <Skill key={`skill-${index}`}>• {skill}</Skill>
                  ))}
                </ItemWrapper>
              </Skills>
            </>
          )}
        </Description>
      </Container>
    </VerticalTimelineElement>
  );
};

export default memo(ExperienceCard);