import './style.css';
import { FC, useRef } from "react";
import { DefaultComponentProps } from "@Types";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { Spinner, Card, Title } from "@Components"
import useFirebase from '@/hooks/useFirebase';

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
    </section>
  )
}

export default AboutMe