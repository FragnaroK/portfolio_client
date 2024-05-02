import { FC, ReactNode } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './Text.css';

interface TextProps extends DefaultComponentProps<ReactNode | string> {}

const Text: FC<TextProps> = ({ children, ...props}) => {

  return (
    <div className="textWrapper" {...props}>
      {children}
    </div>
  )
}

export default Text