import React, { FC, useRef, useState } from "react";
import { DefaultComponentProps, ExtendedCSSProperties } from "@Types/Types";
import './ProjectContainer.css';
import Title from "@Components/Title/Title";
import Button from "@Components/Button/Button";
import Image from "@Components/Image/Image";
import Logger from "node-logger-web";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import Chips from '../Chips/Chips';
import Toggle from '../Toggle/Toggle';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Card from "../Card/Card";
import useMarkdown from "@/hooks/useMarkdown/useMarkdown";

interface ProjectContainerProps extends DefaultComponentProps<string, HTMLElement> {
  title: string;
  timestamp?: string;
  href: string;
  repo: string;
  img: string;
  tech: string[];
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
  href: string;
  repo: string;
}

const ProjectContainerHeader: FC<ProjectHeader> = ({ timestamp, title, img, tech}) => {

  const [showInfo, setShowInfo] = useState<boolean>(true);

  return (
    <header className={showInfo ? "" : "hideProjectContent"}>

      <Image src={img} alt='' />
      <Title level={2} subtitle={timestamp} >{title}</Title>
      <div className="action">
        <Toggle
          initial={faEye}
          target={faEyeSlash}
          onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
            if (e.currentTarget.checked) {
              setShowInfo(false)
            } else {
              setShowInfo(true);
            }
          }}
        >Show/hide project content</Toggle>
      </div>
      {timestamp && <small className="timestamp">{timestamp}</small>}
      <Chips chips={tech} gap={5} label={title} />
    </header>
  )
}

const ProjectContainerFooter: FC<ProjectActions> = ({ href, repo }) => (
  <footer>
    <Button type="link" href={href}>Go to project</Button>
    <Button type="link" icon={faGithub} href={repo}>Repository</Button>
  </footer>
)

const ProjectContainerContent: FC<ProjectContent> = ({ children }) => {
  const parsedMarkdown = useMarkdown(children ?? "");

  return (
    <main >
      <Card
        animateInView={false}
        inner={{ __html: parsedMarkdown }}
      />
    </main>
  )
}


const ProjectContainer: FC<ProjectContainerProps> = ({
  style, onClick, href, img, repo, tech, title, children, timestamp, index = 0, ...props
}) => {

  const log = new Logger("ProjectContainer", import.meta.env.VITE_DEBUG_MODE);
  const translateValue = index % 2 === 0 ? "200vw" : "-200vw";
  const finalID = `project-container-${title}`;
  const defStyle: ExtendedCSSProperties = {
    ...style
  }

  const projectRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: projectRef,
    offset: ["start end", "end end"]
  });
  const translation = useTransform(scrollYProgress, [0, .8], [`translate3d(${translateValue}, 0px, 0px)`, `translate3d(0px, ${55 * index}px, 0px)`])

  const onProjectClickHandler: React.MouseEventHandler<HTMLElement> = (e) => {
    log.d(`Project '${title}' clicked! -> `, e);
    if (onClick) onClick(e);
  }
  
  return (
    <motion.article
      className="projectContainer"
      onClick={onProjectClickHandler}
      ref={projectRef}
      id={finalID}
      style={{
        ...defStyle,
        opacity: scrollYProgress,
        transform: translation
      }}
      {...props}
    >
      <ProjectContainerHeader img={img} tech={tech} title={title} timestamp={timestamp}/>
      <ProjectContainerContent >{children}</ProjectContainerContent>
      <ProjectContainerFooter href={href} repo={repo} />
    </motion.article>
  )
}

export default ProjectContainer