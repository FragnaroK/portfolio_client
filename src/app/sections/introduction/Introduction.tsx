import { FC } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './Introduction.css';
import ProfilePhoto from '@Components/ProfilePhoto/ProfilePhoto';
import Button from "@Components/Button/Button";
import { faCodepen, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Title from "@Components/Title/Title";
import IconButton from '@Components/IconButton/IconButton';
import Text from "@Components/Text/Text";
import Email from "@Components/Email/Email";
import { useFirebaseContext } from "@/context/FirebaseContext/FirebaseContextHooks";

const SocialMedia: FC = () => {

  const { database } = useFirebaseContext();

  const media = [
    {
      name: "GitHub",
      link: database.snap?.info.professional.links.github,
      icon: faGithub
    },
    {
      name: "CodePen",
      link: database.snap?.info.professional.links.codepen,
      icon: faCodepen,
    },
    {
      name: "LinkedIn",
      link: database.snap?.info.professional.links.linkedin,
      icon: faLinkedin
    }
  ]

  return (
    <div className="socialMediaGrid">
      {
        media.map((m) => (
          <IconButton
            key={`${m.name}-link-button`}
            type="link"
            href={m.link}
            alt={`Button linked to my ${m.name} profile`}
          >
            {m.icon}
          </IconButton>
        ))
      }
    </div>
  );
}

const Introduction: FC<DefaultComponentProps> = () => {

  const { database: { snap } } = useFirebaseContext();

  return (
    <section id="introduction">
      <section className="profilePhotoSection">
        <ProfilePhoto />
      </section>
      <section className="profileSideContent">
        <Title subtitle="Web Developer">{`${snap?.info.personal.name.first ?? "Franco"} ${snap?.info.personal.name.last ?? "Canalejo"}`}</Title>
        <SocialMedia />
        <Text>
          <h3>Hey, welcome to my website.</h3>
          <p>
            Here you will find information about me, my experience, my education, and a little bit of my journey.
          </p>
          <p>
            Feel free to connect and chat with me through my LinkedIn or send me an email to <Email>{snap?.info.personal.contact.email ?? "loading@outlook.com"}</Email>
          </p>
        </Text>
      </section>
      <div>
        <Button type="anchor" href="#aboutMe">About Me</Button>
      </div>
    </section>
  )
}

export default Introduction;