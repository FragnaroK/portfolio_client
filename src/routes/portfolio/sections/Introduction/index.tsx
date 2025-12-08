import './style.css';
import { FC, useRef } from "react";
import { DefaultComponentProps } from "@Types";
import Const from "@/constants";
import { deepTrim } from "@Utils/helpers";
import { ProfilePhoto, BetterButton, Title, Text, Email, AnimatedStack, Icon } from '@Components';
import shuffle from "lodash/shuffle";
import useFirebase from '@/hooks/useFirebase';
import SocialMedia from '@/components/SocialMedia';

const techIconsList = Object.keys(Const.TechIcons).map((key) => Const.TechIcons[key]);

const generateTechRing = (size: number) => {
  console.log("Generating tech ring of size:", size);
  return shuffle(techIconsList).map((tech, i) => (
    <Icon
      key={`${deepTrim(tech.name)}-${size}-${i}`}
      icon={tech.icon}
      label={tech.name}
      style={{ transform: `scale(${size})` }}
      index={i + 1}
      total={techIconsList.length}
    />
  ));
};

const TECH_RINGS_CONFIG = {
  count: 4,
  baseRadius: 170,
  radiusIncrement: 80,
  baseSpeed: 1,
  speedIncrement: 1,
  minScale: 1.05,
  maxScale: 1.3
};

const Introduction: FC<DefaultComponentProps> = () => {

  const { database: { snap } } = useFirebase();
  const sectionRef = useRef<HTMLElement>(null);

  const techRings = useRef(
    Array.from({ length: TECH_RINGS_CONFIG.count }, (_, i) => {
      const ringIndex = TECH_RINGS_CONFIG.count - i - 1; 
      const scale = TECH_RINGS_CONFIG.minScale + 
        (ringIndex / (TECH_RINGS_CONFIG.count - 1)) * 
        (TECH_RINGS_CONFIG.maxScale - TECH_RINGS_CONFIG.minScale);
      return generateTechRing(scale);
    })
  ).current;

  const techRingsRadius = useRef(
    Array.from({ length: TECH_RINGS_CONFIG.count }, (_, i) => 
      TECH_RINGS_CONFIG.baseRadius + (i * TECH_RINGS_CONFIG.radiusIncrement)
    )
  ).current;

  const techRingsSpeed = useRef(
    Array.from({ length: TECH_RINGS_CONFIG.count }, (_, i) => 
      TECH_RINGS_CONFIG.baseSpeed + (i * TECH_RINGS_CONFIG.speedIncrement)
    )
  ).current;

  return (
    <section id="introduction" ref={sectionRef} >
      <section className="profilePhotoSection">
        <AnimatedStack
          radius={techRingsRadius}
          speed={techRingsSpeed}
          style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            width: '100%',
            height: '100%',
            transform: 'translateY(-50%) scale(1.2)'
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
            Here you will find information about me, my experience, my education, and a bit of my journey.
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