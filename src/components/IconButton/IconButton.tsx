import { FC, MouseEventHandler, useRef } from "react";
import { DefaultComponentProps, ExtendedCSSProperties } from "@Types/Types";
import './IconButton.css';
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Logger from "node-logger-web";
import { faArrowUpRightFromSquare, faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonType = "download" | "button" | "link";
type ButtonTarget = "_blank" | "_parent" | "_self" | "_top"


export interface IconButtonProps extends DefaultComponentProps<IconDefinition> {
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
  children = faSmile,
  href = "",
  alt = "",
  disabled = false,
  type = 'button',
  target = "_blank"
}) => {

  const log = new Logger("IconButton", import.meta.env.VITE_DEBUG_MODE);
  const buttonRef = useRef<HTMLDivElement>(null);
  const finalClassName = `${className} btn-with-icon`;
  const defaultStyle = {
    ...style,
    "--target-icon": `"\\${faArrowUpRightFromSquare.icon[3]}"`,
  } as ExtendedCSSProperties

  const onButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    log.d(`Button clicked!`, event.target);
    if (onClick) onClick(event);
  };

  const renderButton = (
    <button className={`btn ${finalClassName}`} id={id} style={defaultStyle} onClick={onButtonClick} disabled={disabled}>
      <FontAwesomeIcon icon={children} />
    </button>
  );

  const renderLink = (
    <a className={`btn btn-link ${finalClassName}`} id={id} style={defaultStyle} href={href} target={target} aria-disabled={disabled} rel="noopener noreferrer" aria-label={alt}>
      <FontAwesomeIcon icon={children} className={`buttonIcon`} />
    </a>
  )

  return (
    <div className='iconButtonWrapper' ref={buttonRef}>
      {type !== 'button' ? renderLink : renderButton}
    </div>
  );
}

export default IconButton