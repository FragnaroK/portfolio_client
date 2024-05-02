import { FC } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './Projects.css';
import Title from "@Components/Title/Title";
import ProjectContainer from "@Components/ProjectContainer/ProjectContainer";
import Flex from "@/components/Flex/Flex";
import { useFirebaseContext } from "@/context/FirebaseContext/FirebaseContextHooks";
import ImagePlaceholder from '@Assets/placeholders/Designer.jpg';

interface ProjectsProps extends DefaultComponentProps<undefined> { }



const Projects: FC<ProjectsProps> = () => {

  const { database: { snap } } = useFirebaseContext();

  return (
    <section id="projects">
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
              img={ImagePlaceholder}
              repo={project.repo}
              tech={project.tech}
              style={{ translate: `0% ${55 * i}px` }}
            >
              {/* {project.description} */}
              {`
# Markdown Properties

## Headers

### Header 3
#### Header 4
##### Header 5

## Text Formatting

- *Italic Text*  
- **Bold Text**  
- ***Bold Italic Text***  
- ~~Strikethrough Text~~  
- \`Inline Code\`  

## Lists

### Unordered List
- Item 1
- Item 2
  - Subitem 1
  - Subitem 2

### Ordered List
1. First Item
2. Second Item
    1. Subitem A
    2. Subitem B

## Links and Images

- [Link Text](https://www.example.com)  
- ![Image Alt Text](https://www.example.com/image.jpg)

## Blockquotes

- > This is a blockquote.
- > \- Anonymous

## Horizontal Rule

---

## Code Blocks

\`\`\`python
def greet():
    print("Hello, Markdown!")
\`\`\`              
              `}
            </ProjectContainer>
          ))
        }
      </Flex>
    </section>
  )
}

export default Projects