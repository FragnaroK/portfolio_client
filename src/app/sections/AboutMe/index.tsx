import './style.css';
import { FC, useRef } from "react";
import { DefaultComponentProps } from "@Types";
import { Spinner, Card, Title } from "@Components"
import useFirebase from '@Hooks/useFirebase';
import { IconMeta } from '@Constants/icons';

interface AboutMeProps extends DefaultComponentProps { }
const AboutMe: FC<AboutMeProps> = () => {

  const { database: { snap } } = useFirebase();
  const sectionRef = useRef<HTMLElement>(null);

  const experience = `${snap?.info?.professional.experience.years}`;
  const profile = snap?.info?.personal.profile.replace("{{work_experience}}", experience);

  return (
    <section id="aboutMe" ref={sectionRef}>
      <Title>About Me</Title>
      {snap ? (
        <Card
          html
          title="My Journey"
          subtitle=' '
          label='Contact me via LinkedIn'
          actions={[
            {
              type: "link",
              icon: IconMeta.faLinkedinIn,
              children: "Franco Canalejo",
              href: "https://www.linkedin.com/in/franco-canalejo"
            }
          ]}
        >
          {profile}
        </Card>
      ) : (<Spinner />)}
    </section>
  )
}

export default AboutMe