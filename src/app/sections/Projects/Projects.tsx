import { FC, useRef } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './Projects.css';
import Title from "@Components/Title/Title";
import ProjectContainer from "@Components/ProjectContainer/ProjectContainer";
import Flex from "@Components/Flex/Flex";
import { useFirebaseContext } from "@Context/FirebaseContext/FirebaseContextHooks";
import Spinner from '@Components/Spinner/Spinner';
import { deepTrim } from "@/utils/helpers";

interface ProjectsProps extends DefaultComponentProps<undefined> { }



const Projects: FC<ProjectsProps> = () => {

  const { database: { snap } } = useFirebaseContext();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="projects" ref={sectionRef}>
      <Title>Top Projects</Title>
      <Flex
        fill
        flexDirection="column"
        flexWrap="nowrap"
        gap={100}
        className="projectsList"
        alignItems="center"
      >
        { snap ?
          snap.projects?.slice(0, 5).map((project, i) => (
            <ProjectContainer key={deepTrim(project.title)}
              title={project.title}
              href={project.link}
              img={project.image}
              repo={project.repo}
              tech={project.languages}
              // style={{ translate: `0% ${55 * i}px` }}
              index={i}
            >
              {project.content}
            </ProjectContainer>
          ))
          : (<Spinner />)
        }
      </Flex>
    </section>
  )
}

export default Projects