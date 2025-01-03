import './style.css';
import { FC, useRef } from "react";
import { DefaultComponentProps } from "@Types";
import { useFirebaseContext } from "@Context/Firebase/hooks";
import {  TECH_ICON_LIST } from "@Constants/const";
import { deepTrim } from "@Utils/helpers";
import { ProfilePhoto, BetterButton, Title, IconButton, Text, Email, AnimatedStack, Icon } from '@Components';

import { faCodepen, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { shuffle } from "lodash";


const techRings = [
  shuffle(TECH_ICON_LIST).map((tech, i) => (
    <Icon
      key={deepTrim(`${tech.name}-${tech.icon.iconName}`)}
      icon={tech.icon}
      label={tech.name}
      color={tech.color}
      size="2x"
      index={i + 1}
      total={TECH_ICON_LIST.length}
    />
  )),
  shuffle(TECH_ICON_LIST).map((tech, i) => (
    <Icon
      key={deepTrim(`${tech.name}-${tech.icon.iconName}`)}
      icon={tech.icon}
      label={tech.name}
      color={tech.color}
      size="2x"
      index={i + 1}
      total={TECH_ICON_LIST.length}
    />
  )),
  shuffle(TECH_ICON_LIST).map((tech, i) => (
    <Icon
      key={deepTrim(`${tech.name}-${tech.icon.iconName}`)}
      icon={tech.icon}
      label={tech.name}
      color={tech.color}
      size="3x"
      index={i + 1}
      total={TECH_ICON_LIST.length}
    />
  ))
]

const SocialMedia: FC = () => {

  const { database } = useFirebaseContext();

  const media = [
    {
      name: "GitHub",
      link: database.snap?.info?.professional.links.github,
      icon: faGithub
    },
    {
      name: "CodePen",
      link: database.snap?.info?.professional.links.codepen,
      icon: faCodepen,
    },
    {
      name: "LinkedIn",
      link: database.snap?.info?.professional.links.linkedin,
      icon: faLinkedin
    }
  ]

  return (
    <div className="socialMediaGrid">
      {
        media.map((m) => (
          <IconButton
            key={deepTrim(`${m.name}-link-button`)}
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
  const sectionRef = useRef<HTMLElement>(null)
  
  return (
    <section id="introduction" ref={sectionRef}>
      <section className="profilePhotoSection">
        <AnimatedStack
          radius={[150, 210, 280]}
          speed={[3, 2, 1]}
          style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            width: '100%',
            height: '100%',
            transform: 'translateY(-50%)'
          }}
        >
          {techRings}
        </AnimatedStack>
        <ProfilePhoto />
      </section>
      <section className="profileSideContent">
        <Title subtitle="Web Developer">{`${snap?.info?.personal.name.first ?? "Franco"} ${snap?.info?.personal.name.last ?? "Canalejo"}`}</Title>
        <SocialMedia />
        <Text>
          <h3>Hey, welcome to my website.</h3>
          <p>
            Here you will find information about me, my experience, my education, and a little bit of my journey.
          </p>
          <p>
            Feel free to connect and chat with me through my LinkedIn or send me an email to <Email>{snap?.info?.personal.contact.email ?? "loading@outlook.com"}</Email>
          </p>
        </Text>
      </section>
      <section>
        <BetterButton type="anchor" href="#aboutMe">About Me</BetterButton>
      </section>
    </section>
  )
}

export default Introduction;