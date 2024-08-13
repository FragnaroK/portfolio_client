import React, { FC, useRef, useState } from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { m, useInView, useScroll, useTransform } from 'framer-motion';
import Logger from "node-logger-web";
import { DefaultComponentProps } from "@Types/Types";
import Title from "@Components/Title/Title";
import BetterButton from "@Components/Button/BetterButton";
import Image from "@Components/Image/Image";
import Chips from '@Components/Chips/Chips';
import Toggle from '@Components/Toggle/Toggle';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Card from "@Components/Card/Card";
import './ProjectContainer.css';
import { deepTrim } from "@Utils/helpers";
 

interface ProjectContainerProps extends DefaultComponentProps<string, HTMLElement>, ProjectHeader, ProjectContent, ProjectActions {
  index?: number;
}

interface ProjectHeader {
  title: string;
  timestamp?: string;
  img: string;
  tech: string[];
}

interface ProjectContent {
  children?: string;
}

interface ProjectActions {
  href?: string;
  repo?: string;
}

const ProjectContainerHeader: FC<ProjectHeader> = ({ timestamp, title, img, tech }) => {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <header className={showInfo ? "" : "hideProjectContent"}>
      <Image src={img} alt='' />
      <Title level={2} subtitle={timestamp}>{title}</Title>
      <div className="action">
        <Toggle
          initial={faEye}
          target={faEyeSlash}
          onClick={(e) => setShowInfo(!e.currentTarget.checked)}
          title={`Project ${title} content`}
        >
          {`Show/hide project ${title} content`}
        </Toggle>
      </div>
      {timestamp && <small className="timestamp">{timestamp}</small>}
      <Chips chips={tech} gap={5} label={title} />
    </header>
  )
}

const ProjectContainerFooter: FC<ProjectActions> = ({ href, repo }) => (
  (href || repo) && (
    <footer>
      {href && <BetterButton type="link" href={href}>Go to project</BetterButton>}
      {repo && <BetterButton type="link" icon={faGithub} href={repo}>Repository</BetterButton>}
    </footer>
  )
);

const ProjectContainerContent: FC<ProjectContent> = ({ children }) => (
  <main>
    <Card animateInView={false} html>
      {children}
    </Card>
  </main>
);

const ProjectContainer: FC<ProjectContainerProps> = ({
  style, onClick, href, img, repo, tech, title, children, timestamp, index = 0, ...props
}) => {
  const log = new Logger("ProjectContainer::component",   import.meta.env.DEV );
  const projectRef = useRef<HTMLElement>(null);
  const inView = useInView(projectRef, { once: true });
  const { scrollYProgress } = useScroll({
    target: projectRef,
    offset: ["start end", "end end"]
  });
  const translateValue = index % 2 === 0 ? "200vw" : "-200vw";
  const translation = useTransform(scrollYProgress, [0, .8], [`translate3d(${translateValue}, 0px, 0px)`, `translate3d(0px, ${55 * index}px, 0px)`])

  const onProjectClickHandler: React.MouseEventHandler<HTMLElement> = (e) => {
    log.d(`Project '${title}' clicked! -> `, e);
    onClick?.(e);
  }

  return (
    <m.article
      className="projectContainer"
      onClick={onProjectClickHandler}
      ref={projectRef}
      id={`projectContainer${deepTrim(title)}`}
      style={{
        ...style,
        opacity: scrollYProgress,
        transform: translation
      }}
      {...props}
    >
      <ProjectContainerHeader img={inView ? img : ''} tech={tech} title={title} timestamp={timestamp} />
      <ProjectContainerContent>{children}</ProjectContainerContent>
      <ProjectContainerFooter href={href} repo={repo} />
    </m.article>
  )
}

export default ProjectContainer;