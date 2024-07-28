import { FC, useRef } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './AboutMe.css';
import Title from "@Components/Title/Title";
import Card from "@Components/Card/Card";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useFirebaseContext } from "@Context/FirebaseContext/FirebaseContextHooks";
import AnimatedStack from '@Components/AnimatedStack/AnimatedStack';
import Spinner from "@Components/Spinner/Spinner";

interface AboutMeProps extends DefaultComponentProps { }
const AboutMe: FC<AboutMeProps> = () => {

  const { database: { snap } } = useFirebaseContext();
  const sectionRef = useRef<HTMLElement>(null);

  const experience = `${snap?.info?.professional.experience.years}`;
  const profile = snap?.info?.personal.profile.replace("{{work_experience}}", experience);

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
    </section>
  )
}

export default AboutMe