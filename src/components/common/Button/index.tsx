import "@Styles/common/Button.css";
import { MouseEventHandler, useRef, useCallback, useMemo, forwardRef, useImperativeHandle } from "react";
import Logger from 'node-logger-web';
import { DefaultComponentProps, ExtendedCSSProperties } from "@Types";
import classNames from 'classnames';
import { IconDefinition, IconMeta } from "@Constants/icons";
import RenderButton from "./variants/button.tag";
import RenderLink from "./variants/link.tag";


type ButtonType = "download" | "button" | "link" | "anchor";
type ButtonTarget = "_blank" | "_parent" | "_self" | "_top";

export interface BetterButtonProps extends DefaultComponentProps<string, HTMLButtonElement | HTMLAnchorElement> {
  icon?: IconDefinition;
  singleIcon?: boolean;
  disabled?: boolean;
  href?: string;
  type?: ButtonType;
  target?: ButtonTarget;
  onHoverIcon?: IconDefinition;
  hoverColor?: string;
  filename?: string;
}

const getTargetBasedOnType = (type: ButtonType): ButtonTarget | undefined => type === "anchor" ? undefined : "_blank";

const getIconBasedOnType = (type: ButtonType): IconDefinition => {
  switch (type) {
    case "button": return IconMeta.faCircle;
    case "download": return IconMeta.faDownload;
    case "link": return IconMeta.faArrowUpRightFromSquare;
    case "anchor": return IconMeta.faAnchor;
    default: return IconMeta.faCircle;
  }
};

const BetterButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, BetterButtonProps>(({
  id,
  className,
  style,
  onClick,
  children,
  icon,
  onHoverIcon,
  hoverColor,
  href,
  target,
  filename,
  singleIcon = false,
  disabled = false,
  type = 'button',
}: BetterButtonProps, outerRef) => {
  const log = useMemo(() => new Logger("Button::component", import.meta.env.DEV), []);
  const buttonRef = useRef<HTMLDivElement>(null);

  const iconType = icon ?? IconMeta.faLink;
  const targetType = target ?? getTargetBasedOnType(type);
  const finalClassName = classNames(className, {
    'btn-with-icon': icon,
    'singleIcon': singleIcon,
  });

  const buttonElementRef = useRef<HTMLButtonElement>(null);
  const linkElementRef = useRef<HTMLAnchorElement>(null);

  useImperativeHandle(outerRef, () => type === 'button' ? buttonElementRef.current! : linkElementRef.current!, [type]);

  const defaultStyle = useMemo(() => ({
    ...(hoverColor ? { "--button-hover-background": hoverColor } : {}),
    "--initial-icon": `"\\${iconType.unicode}"`,
    "--target-icon": `"\\${onHoverIcon?.unicode ?? getIconBasedOnType(type).unicode}"`,
  }), [hoverColor, iconType, onHoverIcon, type]) as ExtendedCSSProperties;

  const onButtonClick: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = useCallback((event) => {
    log.d('Button clicked!', event.target);
    if (onClick) onClick(event);
  }, [log, onClick]);

  return (
    <div className="buttonWrapper" ref={buttonRef} style={style}>
      {type === 'button' ? (
        <RenderButton
          id={id}
          className={finalClassName}
          defaultStyle={defaultStyle}
          onButtonClick={onButtonClick}
          disabled={disabled}
          ref={buttonElementRef}
          children={children}
        />
      ) : (
        <RenderLink
          id={id}
          className={finalClassName}
          defaultStyle={defaultStyle}
          onButtonClick={onButtonClick}
          href={href}
          targetType={targetType}
          disabled={disabled}
          type={type}
          filename={filename}
          ref={linkElementRef}
          children={children}
        />
      )}
    </div>
  );
});

export default BetterButton;
