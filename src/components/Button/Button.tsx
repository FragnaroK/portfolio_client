import { forwardRef, MouseEventHandler } from "react";
import { BetterButtonProps } from "./BetterButton";
import classNames from 'classnames';
import { ExtendedCSSProperties } from "@/types/Types";

interface ButtonProps extends BetterButtonProps {
    defaultStyle: ExtendedCSSProperties;
    onButtonClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    id,
    className,
    defaultStyle,
    onButtonClick,
    children,
    disabled
}, ref) => {
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
            className={`btn ${finalClassName}`}
        >
            <span />
            {children}
        </button>
    );
});

export default Button;
