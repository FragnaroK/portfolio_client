import './Card.css';
import { FC, ReactNode, useRef } from "react";
import { DefaultComponentProps } from "@Types/Types";
import Button, { ButtonProps } from "@Components/Button/Button";
import IconButton, { IconButtonProps } from "@Components/IconButton/IconButton";
import Flex from "@Components/Flex/Flex";
import { motion, useInView } from 'framer-motion';
import useMarkdown from '@Hooks/useMarkdown/useMarkdown';

export interface CardProps extends Pick<DefaultComponentProps, "style" | "id" | "className">, Partial<CardHeaderProps>, Partial<CardContentProps>, Partial<CardFooterProps> {
  animateInView?: boolean;
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  divider?: boolean;
}

interface CardContentProps {
  children?: ReactNode | string;
  html?: boolean;
}

interface CardFooterProps {
  label: string;
  fill?: boolean;
  actions: (ButtonProps | IconButtonProps)[];
}

const isButton = (obj: ButtonProps | IconButtonProps): obj is ButtonProps => "icon" in obj;

const CardHeader: FC<CardHeaderProps> = ({ title, subtitle, divider = true }) => (
  <header className="cardHeader">
    <h2>{title}</h2>
    {subtitle ? <h4>{subtitle}</h4> : null}
    {divider && <hr />}
  </header>
)

const CardContent: FC<CardContentProps> = ({ children, html = false }) => {
  const parsedInner = useMarkdown(html ? children as string : '')

  return (
    <main className="cardContent" >
      {
        html ?
          (<div className="cardContentWrapper" dangerouslySetInnerHTML={{ __html: parsedInner }} />)
          :
          (<div className="cardContentWrapper" >{children}</div>)
      }
    </main>
  )
}

const CardFooter: FC<CardFooterProps> = ({ label, actions, fill = false }) => (
  <footer>
    <Flex
      fill
      flexDirection='column'
      alignItems='center'
      gap={8}
    >
      <small>{label}</small>
      <Flex
        fill
        justifyContent='space-around'
        alignContent='center'
      >
        {
          actions.map(
            (action) => isButton(action) ?
              (<Button {...action} key={`button-component-${action.type}-${action.children}`} style={fill ? { width: '100%' } : {}} />)
              : (<IconButton {...action} key={`icon-button-component-${action.type}-${action.children}`} style={fill ? { width: '100%' } : {}} />)
          )
        }
      </Flex>
    </Flex>
  </footer>
)

const Card: FC<CardProps> = ({ id, className, style, children, html = false, title, subtitle, actions, label, animateInView = true, fill = false }) => {

  const cardRef = useRef<HTMLElement>(null);
  const inView = useInView(cardRef, {
    margin: "-50px 0px -50px 0px",
    once: true
  })

  return (
    <motion.article className={`card ${className}`} id={id} ref={cardRef}
      style={{
        opacity: animateInView && !inView ? 0 : 1,
        ...style
      }}
    >
      {title && <CardHeader title={title} subtitle={subtitle} divider={!!(children || actions)} />}
      {children && <CardContent html={html}>{children}</CardContent>}
      {actions && <CardFooter label={label ?? "Action label"} fill={fill} actions={actions} />}
    </motion.article>
  )
}

export default Card;
