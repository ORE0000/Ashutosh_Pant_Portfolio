import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Container,
  Wrapper,
  Title,
  Desc,
  CardContainer,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from "./ProjectsStyle";
import ProjectCards from "../cards/ProjectCards";
import { projects } from "../../data/constants";

const Projects = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState("all");
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const animationQueueRef = useRef([]);

  const getFilteredProjects = useCallback((filterValue) => {
    if (filterValue === "all") {
      return projects || [];
    }
    
    return (projects || []).filter((item) => {
      if (!item?.category) return false;
      
      const itemCategory = item.category.toLowerCase().trim();
      const filterCategory = filterValue.toLowerCase().trim();
      
      if (itemCategory === filterCategory) return true;
      
      switch (filterCategory) {
        case "web app":
          return itemCategory.includes("web") || 
                 itemCategory.includes("frontend") || 
                 itemCategory.includes("fullstack") ||
                 itemCategory === "web app" ||
                 itemCategory === "webapp";
        
        case "data analyst":
          return itemCategory.includes("data") || 
                 itemCategory.includes("analytics") || 
                 itemCategory.includes("analysis") ||
                 itemCategory === "data analyst" ||
                 itemCategory === "data science";
        
        case "machine learning":
          return itemCategory.includes("machine learning") || 
                 itemCategory.includes("ml") || 
                 itemCategory.includes("ai") ||
                 itemCategory.includes("artificial intelligence") ||
                 itemCategory === "machine learning";
        
        default:
          return itemCategory.includes(filterCategory);
      }
    });
  }, []);

  const filteredProjects = getFilteredProjects(toggle);

  useEffect(() => {
    setIsAnimating(true);
    animationQueueRef.current = [...filteredProjects];

    const animateProjects = () => {
      const interval = setInterval(() => {
        if (animationQueueRef.current.length === 0) {
          clearInterval(interval);
          setIsAnimating(false);
          return;
        }
        setVisibleProjects(prev => [...prev, animationQueueRef.current.shift()]);
      }, 150);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateProjects, 100);
    return () => clearTimeout(timer);
  }, [toggle, filteredProjects]);

  const handleToggleChange = useCallback((newToggle) => {
    if (newToggle !== toggle) {
      setToggle(newToggle);
      setVisibleProjects([]);
    }
  }, [toggle]);

  // Debug: Log projects to check for missing id (remove in production)
  console.log("Projects data:", projects);

  if (!projects || !Array.isArray(projects)) {
    return (
      <Container id="projects">
        <Wrapper>
          <Title>Projects</Title>
          <Desc>Error: Project data is unavailable.</Desc>
        </Wrapper>
      </Container>
    );
  }

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. From web apps to android
          apps. Here are some of my projects.
        </Desc>
        <ToggleButtonGroup>
          <ToggleButton
            active={toggle === "all"}
            value="all"
            onClick={() => handleToggleChange("all")}
          >
            All
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "web app"}
            value="web app"
            onClick={() => handleToggleChange("web app")}
          >
            WEB APP'S
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "data analyst"}
            value="data analyst"
            onClick={() => handleToggleChange("data analyst")}
          >
            DATA ANALYST
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "machine learning"}
            value="machine learning"
            onClick={() => handleToggleChange("machine learning")}
          >
            MACHINE LEARNING
          </ToggleButton>
        </ToggleButtonGroup>
        <CardContainer isAnimating={isAnimating}>
          {visibleProjects.length === 0 && !isAnimating && toggle !== "all" ? (
            <div style={{ 
              gridColumn: "1 / -1", 
              textAlign: "center", 
              padding: "40px 20px",
              color: "#666",
              fontSize: "18px"
            }}>
              No projects found for "{toggle}" category. Please check your project
              data categories.
            </div>
          ) : (
            visibleProjects.map((project, index) => (
              <ProjectCards
                key={`${project.id || project.title || index}_${index}`}
                project={project}
                setOpenModal={setOpenModal}
                animationIndex={index}
                isVisible={true}
              />
            ))
          )}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;