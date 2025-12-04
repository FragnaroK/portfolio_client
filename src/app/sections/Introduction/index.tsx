import './style.css';
import { FC, useRef } from "react";
import { DefaultComponentProps } from "@Types";
import Const from "@/constants";
import { deepTrim } from "@Utils/helpers";
import { ProfilePhoto, BetterButton, Title, Text, Email, AnimatedStack, Icon } from '@Components';
import shuffle from "lodash/shuffle";
import useFirebase from '@/hooks/useFirebase';
import SocialMedia from '@/components/SocialMedia';

const techIconsList = Object.keys(Const.Icons).map((key) => Const.Icons[key]);

const techRings = [
  shuffle(techIconsList).map((tech, i) => (
    <Icon
      key={deepTrim(tech.icon.iconName)}
      icon={tech.icon}
      label={tech.icon.iconName}
      color={tech.color}
      size="2x"
      index={i + 1}
      total={techIconsList.length}
    />
  )),
  shuffle(techIconsList).map((tech, i) => (
    <Icon
      key={deepTrim(tech.icon.iconName)}
      icon={tech.icon}
      label={tech.icon.iconName}
      color={tech.color}
      size="2x"
      index={i + 1}
      total={techIconsList.length}
    />
  )),
  shuffle(techIconsList).map((tech, i) => (
    <Icon
      key={deepTrim(tech.icon.iconName)}
      icon={tech.icon}
      label={tech.icon.iconName}
      color={tech.color}
      size="3x"
      index={i + 1}
      total={techIconsList.length}
    />
  ))
]

const Introduction: FC<DefaultComponentProps> = () => {

  const { database: { snap } } = useFirebase();
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
        <SocialMedia
          github={snap?.info?.professional.links.github}
          codepen={snap?.info?.professional.links.codepen}
          linkedin={snap?.info?.professional.links.linkedin}
        />
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