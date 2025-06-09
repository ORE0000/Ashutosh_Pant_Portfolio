import React, { useState, useEffect, useRef, memo } from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import styled, { keyframes } from 'styled-components';

const reveal = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${({ theme }) => theme.card + 'cc' || '#ffffffcc'};
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.text_primary + '20' || '#33333320'};
  border-radius: 12px;
  transform: perspective(1000px) translateZ(0);
  padding: 16px;
  will-change: transform, box-shadow; /* Optimize for animation */
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.5s ease, transform 0.5s ease;
  
  /* Disable backdrop-filter on low-end devices */
  @media (prefers-reduced-motion: reduce), (max-width: 768px) {
    backdrop-filter: none;
  }
  
  &:hover {
    transform: perspective(1000px) rotateX(-3deg) rotateY(3deg) translateZ(20px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1), 0 0 0 1px ${({ theme }) => theme.primary + '20' || '#7877c620'};
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

const School = styled.div`
  font-size: 22px;
  font-weight: 800;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(
    135deg, 
    ${({ theme }) => theme.text_primary || '#333333'} 0%, 
    ${({ theme }) => theme.primary || '#7877c6'} 100%
  );
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

const Degree = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary || '#666666'};
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
  color: ${({ theme }) => theme.text_secondary + '80' || '#66666680'};
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
  color: ${({ theme }) => theme.text_primary || '#333333'};
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

const Grade = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary || '#666666'};
  font-family: 'Inter', sans-serif;
  padding: 0 8px;
  opacity: 0;
  animation: ${reveal} 0.5s ease forwards;
  animation-delay: 0.5s;
  @media only screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

const Span = styled.div`
  display: -webkit-box;
  max-width: 100%;
`;

const EducationCard = ({ education }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

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

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  if (!education) {
    return null;
  }

  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          alt={education?.school || 'Education'}
          style={{ borderRadius: "50%", objectFit: "cover", transition: "filter 0.4s ease" }}
          src={education?.img}
          loading="lazy"
        />
      }
      contentStyle={{
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
      }}
      contentArrowStyle={{
        borderRight: '7px solid #800080', // Purple color for timeline line
        transition: 'border-right-color 0.3s ease',
      }}
      date={education?.date}
      dateClassName="vertical-timeline-element-date"
      iconStyle={{
        background: '#ffffff',
        boxShadow: '0 0 0 4px #800080'
      }}
    >
      <Container ref={cardRef} isVisible={isVisible}>
        <Top>
          <Image src={education?.img} loading="lazy" />
          <Body>
            <School>{education?.school || 'Unknown School'}</School>
            <Degree>{education?.degree || 'Unknown Degree'}</Degree>
            <DateText>{education?.date || 'Unknown Date'}</DateText>
          </Body>
        </Top>
        <Grade>
          <b>Grade: </b>{education?.grade || 'N/A'}
        </Grade>
        <Description>
          {education?.desc && <Span>{education.desc}</Span>}
        </Description>
      </Container>
    </VerticalTimelineElement>
  );
};

export default memo(EducationCard);