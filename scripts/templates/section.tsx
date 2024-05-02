import { FC } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './COMPONENT_NAME.css';

interface COMPONENT_NAMEProps extends DefaultComponentProps {}

const COMPONENT_NAME: FC<COMPONENT_NAMEProps> = ({
  id, className, style, onClick, children
}) => {

  return (
    <></>
  )
}

export default COMPONENT_NAME