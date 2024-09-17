import './style.css';
import { FC } from "react";
import { DefaultComponentProps } from "@Types";

interface COMPONENT_NAMEProps extends DefaultComponentProps {}

const COMPONENT_NAME: FC<COMPONENT_NAMEProps> = ({
  id, className, style, onClick, children
}) => {

  return (
    <></>
  )
}

export default COMPONENT_NAME