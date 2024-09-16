import { forwardRef, HTMLAttributeAnchorTarget, MouseEventHandler } from "react";
import { BetterButtonProps } from ".";
import classNames from 'classnames';
import { ExtendedCSSProperties } from "@Types";

interface LinkProps extends Partial<BetterButtonProps> {
    defaultStyle?: ExtendedCSSProperties;
    onButtonClick?: MouseEventHandler<HTMLAnchorElement>;
    targetType?: HTMLAttributeAnchorTarget;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({
  id,
  className,
  defaultStyle,
  onButtonClick,
  children,
  href,
  targetType,
  disabled,
  type,
  filename
}: LinkProps, ref) => {
  const finalClassName = classNames(className, {
    'btn-with-icon': true,
  });

  return (
    <a
      className={classNames('btn', 'btn-link', finalClassName)}
      type={type === "download" ? type : undefined}
      id={id}
      style={defaultStyle}
      href={href}
      target={targetType}
      aria-disabled={disabled}
      onClick={onButtonClick}
      download={type === "download" && filename ? filename : undefined}
      rel="noopener noreferrer"
      ref={ref}
    >
      <span />
      {children}
    </a>
  );
});

export default Link;
