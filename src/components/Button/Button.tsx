import React, { FC, MouseEventHandler, useRef, useCallback, useMemo } from "react";
import Logger from 'node-logger-web';
import { DefaultComponentProps, ExtendedCSSProperties } from "@Types/Types";
import classNames from 'classnames';
import "./Button.css";
import { 
  faAnchor, 
  faArrowUpRightFromSquare, 
  faCircle, 
  faDownload, 
  faLink, 
  IconDefinition 
} from "@fortawesome/free-solid-svg-icons";

type ButtonType = "download" | "button" | "link" | "anchor";
type ButtonTarget = "_blank" | "_parent" | "_self" | "_top";

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

const getTargetBasedOnType = (type: ButtonType): ButtonTarget | undefined => 
  type === "link" ? "_blank" : undefined;

const getIconBasedOnType = (type: ButtonType): IconDefinition => {
  switch (type) {
    case "button": return faCircle;
    case "download": return faDownload;
    case "link": return faArrowUpRightFromSquare;
    case "anchor": return faAnchor;
    default: return faCircle;
  }
};

const Button: FC<ButtonProps> = React.memo(({
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
  const log = useMemo(() => new Logger("Button", import.meta.env.DEV), []);
  const buttonRef = useRef<HTMLDivElement>(null);

  const iconType = icon ?? faLink;
  const targetType = target ?? getTargetBasedOnType(type);
  const finalClassName = classNames(className, {
    'btn-with-icon': icon,
    'singleIcon': singleIcon,
  });

  const defaultStyle = useMemo(() => ({
    ...(hoverColor ? { "--button-hover-color": hoverColor } : {}),
    "--initial-icon": `"\\${iconType.icon[3]}"`,
    "--target-icon": `"\\${onHoverIcon?.icon[3] ?? getIconBasedOnType(type).icon[3]}"`,
  }), [hoverColor, iconType, onHoverIcon, type]) as ExtendedCSSProperties;

  const onButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    log.d('Button clicked!', event.target);
    if (onClick) onClick(event);
  }, [log, onClick]);

  const renderButton = (
    <button 
      className={`btn ${finalClassName}`} 
      id={id} 
      style={defaultStyle} 
      onClick={onButtonClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );

  const renderLink = (
    <a
      className={`btn btn-link ${finalClassName}`}
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
  );

  return (
    <div className="buttonWrapper" ref={buttonRef} style={style}>
      {type !== 'button' ? renderLink : renderButton}
    </div>
  );
});

export default Button;
