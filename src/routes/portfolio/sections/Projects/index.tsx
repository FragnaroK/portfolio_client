import './style.css';
import { FC, useRef } from "react";
import { DefaultComponentProps } from "@Types";
import { deepTrim } from "@Utils/helpers";
import { Title, ProjectContainer, Flex, Spinner} from '@Components';
import useFirebase from '@/hooks/useFirebase';

interface ProjectsProps extends DefaultComponentProps<undefined> { }



const Projects: FC<ProjectsProps> = () => {

  const { database: { snap } } = useFirebase();
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
          snap.projects?.slice(0, 4).map((project, i) => (
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