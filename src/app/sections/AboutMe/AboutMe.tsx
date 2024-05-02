import { FC } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './AboutMe.css';
import Title from "@Components/Title/Title";
import Card from "@Components/Card/Card";
import Text from "@Components/Text/Text";
import { faBitbucket, faBootstrap, faChrome, faConfluence, faCss3, faDocker, faGit, faGithub, faGoogle, faHtml5, faJira, faJs, faLess, faLinux, faMarkdown, faNodeJs, faReact, faSass, faSourcetree, faWindows } from "@fortawesome/free-brands-svg-icons";
import Flex from '@Components/Flex/Flex';
import Icon from "@Components/Icon/Icon";
import { useFirebaseContext } from "@/context/FirebaseContext/FirebaseContextHooks";

interface AboutMeProps extends DefaultComponentProps { }
const techList = [
  {
    color: "#E44D26", // HTML5 color
    name: "HTML5",
    icon: faHtml5
  },
  {
    color: "#264DE4", // CSS3 color
    name: "CSS3",
    icon: faCss3
  },
  {
    color: "#61DAFB", // React color
    name: "React",
    icon: faReact
  },
  {
    color: "#4285F4", // Google color
    name: "Google",
    icon: faGoogle
  },
  {
    color: "#68A063", // Node.js color
    name: "Node.js",
    icon: faNodeJs
  },
  {
    color: "#F0DB4F", // JavaScript color
    name: "JavaScript",
    icon: faJs
  },
  {
    color: "#FCC624", // Linux color
    name: "Linux",
    icon: faLinux
  },
  {
    color: "#0078D7", // Windows color
    name: "Windows",
    icon: faWindows
  },
  {
    color: "#CC6699", // Sass color
    name: "Sass",
    icon: faSass
  },
  {
    color: "#1D365D", // Less color
    name: "Less",
    icon: faLess
  },
  {
    color: "#4078C0", // GitHub color
    name: "GitHub",
    icon: faGithub
  },
  {
    color: "#0052CC", // SourceTree color
    name: "SourceTree",
    icon: faSourcetree
  },
  {
    color: "#205081", // Bitbucket color
    name: "Bitbucket",
    icon: faBitbucket
  },
  {
    color: "#0052CC", // Jira color
    name: "Jira",
    icon: faJira
  },
  {
    color: "#172B4D", // Confluence color
    name: "Confluence",
    icon: faConfluence
  },
  {
    color: "#F05032", // Git color
    name: "Git",
    icon: faGit
  },
  {
    color: "#4285F4", // Chrome color
    name: "Chrome",
    icon: faChrome
  },
  {
    color: "#2496ED", // Docker color
    name: "Docker",
    icon: faDocker
  },
  {
    color: "#083A7D", // Markdown color
    name: "Markdown",
    icon: faMarkdown
  },
  {
    color: "#563D7C", // Bootstrap color
    name: "Bootstrap",
    icon: faBootstrap
  },
];


const AboutMe: FC<AboutMeProps> = () => {

  const { database: { snap }} = useFirebaseContext();



  return (
    <section id="aboutMe">
      <Title>About Me</Title>
      <Card
        title="Get to know me"
        subtitle="Brief description about me"
        label="You can learn a bit more if you google me!"
        actions={[
          {
            type: "link",
            icon: faGoogle,
            children: "Google - Franco Canalejo",
            href: "https://www.google.com/search?q=franco+canalejo"
          }
        ]}
      >
        <Text>
          <p>{snap?.info.personal.profile}</p>
          </Text>
      </Card>
      <Card
        title="Some of the tech I often use"
        subtitle="Some leading sentence about the tech below"
      >
        <br />
        <Flex
          fill
          flexWrap="wrap"
          justifyContent="space-evenly"
        >
          {
            techList.map((tech, i) => (
              <Icon
                key={`${tech.name}-${tech.icon.iconName}`}
                icon={tech.icon}
                label={tech.name}
                color={tech.color}
                size="3x"
                index={i + 1}
                total={techList.length}
                style={{ flex: "1 0 20%", textAlign: "center", margin: "15px 0"  }}
              />
            )) 
          }
        </Flex>
      </Card>
    </section>
  )
}

export default AboutMe