import '@Styles/common/Card.css';
import { FC, ReactNode, useRef } from "react";
import { m, useInView } from 'framer-motion';
import classNames from 'classnames';

import { DefaultComponentProps } from "@Types";
import useMarkdown from '@/hooks/useMarkdown';
import { deepTrim } from '@Utils/helpers';
import {Accordion, IconButton, Flex, BetterButton } from '@Components';
import { IconButtonProps } from "@/components/common/IconButton";
import { BetterButtonProps } from "@/components/common/Button";


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
  collapsable?: string;
}

interface CardFooterProps {
  label: string;
  fill?: boolean;
  actions: (BetterButtonProps | IconButtonProps)[];
}

const isButton = (obj: BetterButtonProps | IconButtonProps): obj is BetterButtonProps => "icon" in obj;

const CardHeader: FC<CardHeaderProps> = ({ title, subtitle, divider = true }) => (
  <header className="cardHeader">
    <h2>{title}</h2>
    {subtitle ? <h4>{subtitle}</h4> : null}
    {divider && <hr />}
  </header>
)

const CardContent: FC<CardContentProps> = ({ children, collapsable, html = false }) => {
  const parsedInner = useMarkdown(html ? children as string : '')
  const content = html ?
  (<div className="cardContentWrapper" dangerouslySetInnerHTML={{ __html: parsedInner }} />)
  : (<div className="cardContentWrapper" >{children}</div>)

  return (
    <main className="cardContent" >
      {
        collapsable ? (
          <Accordion label={collapsable}>
            {content}
          </Accordion>
        ) : content
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
              (<BetterButton {...action} key={deepTrim(`button-component-${action.type}-${action.children}`)} style={fill ? { width: '100%' } : {}} />)
              : (<IconButton {...action} key={deepTrim(`icon-button-component-${action.type}-${action.children}`)} style={fill ? { width: '100%' } : {}} />)
          )
        }
      </Flex>
    </Flex>
  </footer>
)

const Card: FC<CardProps> = ({ id, className, style, children, collapsable, html = false, title, subtitle, actions, label, animateInView = true, fill = false }) => {

  const cardRef = useRef<HTMLElement>(null);
  const inView = useInView(cardRef, {
    margin: "-50px 0px -50px 0px",
    once: true
  })

  return (
    <m.article className={classNames('card', className)} id={id} ref={cardRef}
      style={{
        opacity: animateInView && !inView ? 0 : 1,
        ...style
      }}
    >
      {title && <CardHeader title={title} subtitle={subtitle} divider={!!(children || actions)} />}
      {children && <CardContent html={html} collapsable={collapsable}>{children}</CardContent>}
      {actions && <CardFooter label={label ?? "Action label"} fill={fill} actions={actions} />}
    </m.article>
  )
}

export default Card;
