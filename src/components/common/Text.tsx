import '@Styles/common/Text.css';
import { FC, ReactNode } from "react";
import { DefaultComponentProps } from "@Types";

interface TextProps extends DefaultComponentProps<ReactNode | string> {}

const Text: FC<TextProps> = ({ children, ...props}) => {

  return (
    <div className="textWrapper" {...props}>
      {children}
    </div>
  )
}

export default Text