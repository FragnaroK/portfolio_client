import { forwardRef, MouseEventHandler } from "react";
import { BetterButtonProps } from ".";
import classNames from 'classnames';
import { ExtendedCSSProperties } from "@Types";

interface ButtonProps extends Partial<BetterButtonProps> {
    defaultStyle?: ExtendedCSSProperties;
    onButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    id,
    className,
    defaultStyle,
    onButtonClick,
    children,
    disabled
}: ButtonProps, ref) => {
    const finalClassName = classNames(className, {
        'btn-with-icon': true,
    });

    return (
        <button
            id={id}
            ref={ref}
            disabled={disabled}
            style={defaultStyle}
            onClick={onButtonClick}
            className={classNames('btn', finalClassName)}
        >
            <span />
            {children}
        </button>
    );
});

export default Button;
