import { FC, MouseEventHandler, useRef } from "react";
import Logger from 'node-logger-web';
import { DefaultComponentProps, ExtendedCSSProperties } from "@Types/Types";
import "./Button.css";
import { faAnchor, faArrowUpRightFromSquare, faCircle, faDownload, faLink, IconDefinition } from "@fortawesome/free-solid-svg-icons";

type ButtonType = "download" | "button" | "link" | "anchor";
type ButtonTarget = "_blank" | "_parent" | "_self" | "_top"

export interface ButtonProps extends DefaultComponentProps<string, HTMLButtonElement | HTMLAnchorElement> {
  icon?: IconDefinition;
  singleIcon?: boolean;
  disabled?: boolean;
  href?: string;
  type?: ButtonType;
  target?: ButtonTarget;
  onHoverIcon?: IconDefinition;
  hoverColor?: string;
}

const getTargetBasedOnType = (type: ButtonType = "link"): ButtonTarget | undefined =>
  type === "link" ? "_blank" : undefined


const getIconBasedOnType = (type: ButtonType = "button"): IconDefinition => {
  switch (type) {
    case "button":
      return faCircle;
    case "download":
      return faDownload;
    case "link":
      return faArrowUpRightFromSquare;
    case "anchor":
      return faAnchor;
    default:
      return faCircle;
  }
}

const Button: FC<ButtonProps> = ({
  id,
  className,
  style,
  onClick,
  children,
  icon,
  onHoverIcon,
  hoverColor,
  href,
  singleIcon = false,
  disabled = false,
  type = 'button',
  target
}) => {

  const log = new Logger("Button", import.meta.env.VITE_DEBUG_MODE);

  const buttonRef = useRef<HTMLDivElement>(null);
  const iconType = icon ?? faLink;
  const targetType = target ?? getTargetBasedOnType(type);
  const finalClassName = `${className}${icon ? " btn-with-icon" : ""}`;

  const defaultStyle = {
    ...(hoverColor ? { "--button-hover-color": hoverColor } : {}),
    "--initial-icon": `"\\${iconType.icon[3]}"`,
    "--target-icon": `"\\${onHoverIcon?.icon[3] ?? getIconBasedOnType(type).icon[3]}"`,
  } as ExtendedCSSProperties

  const onButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    log.d(`Button clicked!`, event.target);
    if (onClick) onClick(event);
  };

  const renderButton = (
    <button className={`btn ${finalClassName} ${singleIcon ? "singleIcon" : ""}`} id={id} style={defaultStyle} onClick={onButtonClick} disabled={disabled}>
      {children}
    </button>
  );

  const renderLink = (
    <a
      className={`btn btn-link ${finalClassName} ${singleIcon ? "singleIcon" : ""}`}
      type={type === "download" ? type : undefined}
      id={id}
      style={defaultStyle}
      href={href}
      target={targetType}
      aria-disabled={disabled}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )

  return (
    <div className="buttonWrapper" ref={buttonRef} style={style}>
      {type !== 'button' ? renderLink : renderButton}
    </div>
  );
};

export default Button;
