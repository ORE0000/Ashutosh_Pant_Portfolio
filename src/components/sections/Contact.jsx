import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import emailjs from "@emailjs/browser";

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
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
    135deg, 
    ${({ theme }) => theme.bg || '#ffffff'} 0%, 
    ${({ theme }) => theme.bg || '#ffffff'}95 50%, 
    ${({ theme }) => theme.bg || '#ffffff'} 100%
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
  max-width: 1200px;
  gap: 40px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: opacity 0.8s ease, transform 0.8s ease;
  
  @media (max-width: 960px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const Title = styled.div`
  font-size: clamp(32px, 8vw, 64px);
  text-align: center;
  font-weight: 700;
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
  }
`;

const Desc = styled.div`
  font-size: 20px;
  text-align: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary || '#666666'};
  max-width: 600px;
  line-height: 1.6;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 18px;
    padding: 0 10px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  background: rgba(${({ theme }) => theme.card_rgba || '255, 255, 255'}, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(${({ theme }) => theme.text_primary_rgba || '255, 255, 255'}, 0.1);
  padding: 48px;
  border-radius: 24px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 20px 60px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  margin-top: 40px;
  gap: 24px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  /* Disable backdrop-filter on low-end devices */
  @media (prefers-reduced-motion: reduce), (max-width: 768px) {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
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
      rgba(255, 255, 255, 0.02), 
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 16px 48px rgba(0, 0, 0, 0.15),
      0 32px 80px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    border-color: rgba(${({ theme }) => theme.primary_rgba || '120, 119, 198'}, 0.3);

    &::before {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 32px 24px;
    margin-top: 32px;
  }
`;

const ContactTitle = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary || '#333333'};
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: linear-gradient(
      90deg, 
      ${({ theme }) => theme.primary || '#7877c6'}, 
      ${({ theme }) => theme.primary || '#7877c6'}60
    );
    border-radius: 1px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ContactInput = styled.input`
  width: 100%;
  background: rgba(${({ theme }) => theme.card_rgba || '255, 255, 255'}, 0.03);
  border: 2px solid rgba(${({ theme }) => theme.text_secondary_rgba || '128, 128, 128'}, 0.2);
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary || '#333333'};
  border-radius: 16px;
  padding: 18px 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  backdrop-filter: blur(10px);
  box-sizing: border-box;

  /* Disable backdrop-filter on low-end devices */
  @media (prefers-reduced-motion: reduce), (max-width: 768px) {
    backdrop-filter: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary || '#666666'};
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.primary || '#7877c6'};
    background: rgba(${({ theme }) => theme.card_rgba || '255, 255, 255'}, 0.08);
    transform: translateY(-2px);
    box-shadow: 
      0 8px 24px rgba(${({ theme }) => theme.primary_rgba || '120, 119, 198'}, 0.2),
      0 0 0 4px rgba(${({ theme }) => theme.primary_rgba || '120, 119, 198'}, 0.1);

    &::placeholder {
      opacity: 0.5;
      transform: translateX(4px);
    }
  }

  &:hover:not(:focus) {
    border-color: rgba(${({ theme }) => theme.text_secondary_rgba || '128, 128, 128'}, 0.4);
    background: rgba(${({ theme }) => theme.card_rgba || '255, 255, 255'}, 0.05);
  }
`;

const ContactInputMessage = styled.textarea`
  width: 100%;
  background: rgba(${({ theme }) => theme.card_rgba || '255, 255, 255'}, 0.03);
  border: 2px solid rgba(${({ theme }) => theme.text_secondary_rgba || '128, 128, 128'}, 0.2);
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary || '#333333'};
  border-radius: 16px;
  padding: 18px 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  backdrop-filter: blur(10px);
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  box-sizing: border-box;

  /* Disable backdrop-filter on low-end devices */
  @media (prefers-reduced-motion: reduce), (max-width: 768px) {
    backdrop-filter: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary || '#666666'};
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.primary || '#7877c6'};
    background: rgba(${({ theme }) => theme.card_rgba || '255, 255, 255'}, 0.08);
    transform: translateY(-2px);
    box-shadow: 
      0 8px 24px rgba(${({ theme }) => theme.primary_rgba || '120, 119, 198'}, 0.2),
      0 0 0 4px rgba(${({ theme }) => theme.primary_rgba || '120, 119, 198'}, 0.1);

    &::placeholder {
      opacity: 0.5;
      transform: translateX(4px);
    }
  }

  &:hover:not(:focus) {
    border-color: rgba(${({ theme }) => theme.text_secondary_rgba || '128, 128, 128'}, 0.4);
    background: rgba(${({ theme }) => theme.card_rgba || '255, 255, 255'}, 0.05);
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: linear-gradient(
    135deg, 
    ${({ theme }) => theme.primary || '#7877c6'} 0%, 
    ${({ theme }) => theme.primary || '#7877c6'}cc 100%
  );
  padding: 18px 32px;
  margin-top: 16px;
  border-radius: 16px;
  border: none;
  color: ${({ theme }) => theme.white || '#ffffff'};
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 
    0 8px 24px rgba(${({ theme }) => theme.primary_rgba || '120, 119, 198'}, 0.3),
    0 4px 12px rgba(0, 0, 0, 0.1);

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
    transition: left 0.5s;
  }

  &:hover:not(:disabled) {
    background: linear-gradient(
      135deg, 
      ${({ theme }) => theme.primary || '#7877c6'} 0%, 
      ${({ theme }) => theme.primary || '#7877c6'}dd 100%
    );
    transform: translateY(-4px);
    box-shadow: 
      0 16px 32px rgba(${({ theme }) => theme.primary_rgba || '120, 119, 198'}, 0.4),
      0 8px 16px rgba(0, 0, 0, 0.15);

    &::before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 24px rgba(${({ theme }) => theme.primary_rgba || '120, 119, 198'}, 0.3),
      0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    animation: ${pulse} 2s infinite;
  }

  @media (max-width: 768px) {
    padding: 16px 24px;
    font-size: 16px;
  }
`;

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
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

  const handelSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_z9nz3xe",
        "template_tctbj38",
        form.current,
        "IvMuHMZvZBsBjRKWJ"
      )
      .then(
        (result) => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          form.current.reset();
        },
        (error) => {
          setLoading(false);
          alert("Oops! Something went wrong. Please try again.");
        }
      );
  };

  return (
    <Container ref={containerRef}>
      <Wrapper isVisible={isVisible}>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm ref={form} onSubmit={handelSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <InputWrapper>
            <ContactInput placeholder="Your Email" name="from_email" required />
          </InputWrapper>
          <InputWrapper>
            <ContactInput placeholder="Your Name" name="from_name" required />
          </InputWrapper>
          <InputWrapper>
            <ContactInput placeholder="Subject" name="subject" required />
          </InputWrapper>
          <InputWrapper>
            <ContactInputMessage
              placeholder="Message"
              name="message"
              rows={4}
              required
            />
          </InputWrapper>
          <ContactButton
            type="submit"
            value={loading ? "Sending..." : "Send"}
            disabled={loading}
          />
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;