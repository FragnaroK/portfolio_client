import "@Styles/common/IconButton.css";
import { FC, MouseEventHandler, useRef } from "react";
import { DefaultComponentProps, ExtendedCSSProperties } from "@Types";
import Logger from "node-logger-web";
import classNames from "classnames";
import { IconMeta } from "@Constants/icons";
 

type ButtonType = "download" | "button" | "link";
type ButtonTarget = "_blank" | "_parent" | "_self" | "_top"


export interface IconButtonProps extends DefaultComponentProps<string> {
  disabled?: boolean;
  href?: string;
  type?: ButtonType;
  alt?: string;
  target?: ButtonTarget;
}

const IconButton: FC<IconButtonProps> = ({
  id,
  className,
  style,
  onClick,
  children = IconMeta.faSmile.className,
  href = "",
  alt = "",
  disabled = false,
  type = 'button',
  target = "_blank"
}) => {

  const log = new Logger("IconButton::component",   import.meta.env.DEV );
  const buttonRef = useRef<HTMLDivElement>(null);
  const finalClassName = classNames('btn-with-icon', className);
  const defaultStyle = {
    ...style,
    "--target-icon": `"\\${IconMeta.faArrowUpRightFromSquare.unicode}"`,
  } as ExtendedCSSProperties

  const onButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    log.d(`Button clicked!`, event.target);
    if (onClick) onClick(event);
  };

  const renderButton = (
    <button title={`Button ${alt}`} className={classNames('btn', 'btn-icn', finalClassName)} id={id} style={defaultStyle} onClick={onButtonClick} disabled={disabled}>
      <i className={children}></i>
    </button>
  );

  const renderLink = (
    <a className={classNames('btn', 'btn-icn', 'btn-link', finalClassName)} id={id} style={defaultStyle} href={href} target={target} aria-disabled={disabled} rel="noopener noreferrer" aria-label={alt}>
      <i className={children}></i>
    </a>
  )

  return (
    <div className="iconButtonWrapper" ref={buttonRef}>
      {type === 'button' ? renderButton : renderLink}
    </div>
  );
}

export default IconButton