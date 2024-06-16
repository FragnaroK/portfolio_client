import { FC, useRef } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './Projects.css';
import Title from "@Components/Title/Title";
import ProjectContainer from "@Components/ProjectContainer/ProjectContainer";
import Flex from "@/components/Flex/Flex";
import { useFirebaseContext } from "@/context/FirebaseContext/FirebaseContextHooks";
import { useUtilsContext } from "@/context/UtilsContext/UtilsContextHook";
import { useScroll, useMotionValueEvent } from "framer-motion";

interface ProjectsProps extends DefaultComponentProps<undefined> { }



const Projects: FC<ProjectsProps> = () => {

  const { database: { snap } } = useFirebaseContext();
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll();
  const { setSection } = useUtilsContext();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= ( sectionRef.current?.offsetTop ?? 0)) {
      setSection("Projects")
    }
  })

  return (
    <section id="projects" ref={sectionRef}>
      <Title>Top Projects</Title>
      <Flex
        fill
        flexDirection="column"
        flexWrap="nowrap"
        gap={100}
        className="projectsList"
      >
        {
          snap?.projects.slice(0, 5).map((project, i) => (
            <ProjectContainer key={`${project.project}`}
              title={project.project}
              href={project.link}
              img={project.image}
              repo={project.repo}
              tech={project.tech}
              // style={{ translate: `0% ${55 * i}px` }}
              index={i}
            >
              {project.description}
            </ProjectContainer>
          ))
        }
      </Flex>
    </section>
  )
}

export default Projects