import { CSSProperties, FC, ReactNode } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './Flex.css';
import classNames from "classnames";

type PickedCSS =
  | "alignContent"
  | "alignItems"
  | "flex"
  | "alignSelf"
  | "flexBasis"
  | "flexDirection"
  | "flexFlow"
  | "flexGrow"
  | "flexShrink"
  | "flexWrap"
  | "gap"
  | "justifyContent"
  | "justifyItems"
  | "justifySelf";


interface FlexProps extends DefaultComponentProps<ReactNode>, Pick<CSSProperties, PickedCSS> { 
  fill?: boolean;
}

const Flex: FC<FlexProps> = ({
  id,
  className,
  style,
  children,
  fill,
  ...restProps
}) => {

  const flexStyle: React.CSSProperties = {
    display: 'flex',
    width: fill ? '100%' : 'auto',
    ...style,
    ...restProps
  }

  return (
    <div
      id={id}
      className={classNames('flexContainer', className)}
      style={flexStyle}
    >
      {children}
    </div>
  );
};

export default Flex;