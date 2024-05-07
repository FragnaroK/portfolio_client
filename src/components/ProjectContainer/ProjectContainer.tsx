import React, { FC, useRef, useState } from "react";
import { DefaultComponentProps, ExtendedCSSProperties } from "@Types/Types";
import './ProjectContainer.css';
import Title from "@Components/Title/Title";
import Button from "@Components/Button/Button";
import Image from "@Components/Image/Image";
import Logger from "node-logger-web";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { motion, useScroll } from 'framer-motion';
import Chips from '../Chips/Chips';
import Toggle from '../Toggle/Toggle';
import { faCompressAlt, faExpandAlt, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Card from "../Card/Card";
import useMarkdown from "@/hooks/useMarkdown/useMarkdown";

interface ProjectContainerProps extends DefaultComponentProps<string, HTMLElement> {
  title: string;
  timestamp?: string;
  href: string;
  repo: string;
  img: string;
  tech: string[];
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

const ProjectContainerHeader: FC<ProjectHeader> = ({ timestamp, title, img, tech }) => {

  const [showInfo, setShowInfo] = useState<boolean>(true);

  return (
    <header className={showInfo ? "" : "hideProjectContent"}>

      <Image src={img} alt='' />
      <Title level={2} subtitle={timestamp}>{title}</Title>
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
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <main >
      <Card
        className={`collapsable ${expanded ? "expanded" : ""}`}
        animateInView={false}
        inner={{ __html: parsedMarkdown }}
      />
      <Card
        animateInView={false}
        inner={{ __html: parsedMarkdown }}
      />
      <Toggle
        initial={faExpandAlt}
        target={faCompressAlt}
        onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
          if (expanded !== e.currentTarget.checked) setExpanded(e.currentTarget.checked);
        }}
      >Expand content</Toggle>
    </main>
  )
}


const ProjectContainer: FC<ProjectContainerProps> = ({
  style, onClick, href, img, repo, tech, title, children, timestamp, id, ...props
}) => {

  const log = new Logger("ProjectContainer", import.meta.env.VITE_DEBUG_MODE);
  const projectRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: projectRef,
    offset: ["start end", "end end"]
  });

  const defStyle: ExtendedCSSProperties = {
    ...style
  }

  const onProjectClickHandler: React.MouseEventHandler<HTMLElement> = (e) => {
    log.d(`Project '${title}' clicked! -> `, e);
    if (onClick) onClick(e);
  }

  return (
    <motion.article
      className="projectContainer"
      onClick={onProjectClickHandler}
      style={{
        ...defStyle,
        opacity: scrollYProgress
      }}
      ref={projectRef}
      id={`${id}-project-container-${title}`}
      {...props}
    >
      <ProjectContainerHeader img={img} tech={tech} title={title} timestamp={timestamp} />
      <ProjectContainerContent >{children}</ProjectContainerContent>
      <ProjectContainerFooter href={href} repo={repo} />
    </motion.article>
  )
}

export default ProjectContainer