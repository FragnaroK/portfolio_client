import { FC, useRef } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './AboutMe.css';
import Title from "@Components/Title/Title";
import Card from "@Components/Card/Card";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Icon from "@Components/Icon/Icon";
import { useFirebaseContext } from "@Context/FirebaseContext/FirebaseContextHooks";
import AnimatedStack from '@Components/AnimatedStack/AnimatedStack';
import Spinner from "@Components/Spinner/Spinner";
import { TECH_ICON_LIST } from "@Constants/const";

interface AboutMeProps extends DefaultComponentProps { }
const AboutMe: FC<AboutMeProps> = () => {

  const { database: { snap } } = useFirebaseContext();
  const sectionRef = useRef<HTMLElement>(null);

  const experience = `${snap?.info.professional.experience.years}`;
  const profile = snap?.info.personal.profile.replace("{{work_experience}}", experience);
  const techRings = [
    TECH_ICON_LIST.map((tech, i) => (
      <Icon
        key={`${tech.name}-${tech.icon.iconName}`}
        icon={tech.icon}
        label={tech.name}
        color={tech.color}
        size="2x"
        index={i + 1}
        total={TECH_ICON_LIST.length}
      />
    )),
    TECH_ICON_LIST.map((tech, i) => (
      <Icon
        key={`${tech.name}-${tech.icon.iconName}`}
        icon={tech.icon}
        label={tech.name}
        color={tech.color}
        size="2x"
        index={i + 1}
        total={TECH_ICON_LIST.length}
      />
    )),
    TECH_ICON_LIST.map((tech, i) => (
      <Icon
        key={`${tech.name}-${tech.icon.iconName}`}
        icon={tech.icon}
        label={tech.name}
        color={tech.color}
        size="3x"
        index={i + 1}
        total={TECH_ICON_LIST.length}
      />
    ))
  ]


  return (
    <section id="aboutMe" ref={sectionRef}>
      <Title>About Me</Title>
      {snap ? (
        <Card
          html
          title="Who am I?"
          subtitle="Brief description about me."
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
          {profile}
        </Card>
      ) : (<Spinner />)}
      <AnimatedStack
        radius={[150, 210, 280]}
        speed={[3, 2, 1]}
        label="My knowledge extends through a large set of modern technologies"
      >
        {techRings}
      </AnimatedStack>
      <br />
    </section>
  )
}

export default AboutMe