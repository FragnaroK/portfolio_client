import { FC } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './Spinner.css';
import Flex from "@Components/Flex/Flex";
import { ThreeCircles } from "react-loader-spinner";

interface SpinnerProps extends DefaultComponentProps { }

const Spinner: FC<SpinnerProps> = () => {

  return (
  <Flex fill justifyContent="center" alignContent="center" alignItems="center" style={{ height: '100%' }}>
    <ThreeCircles visible color="var(--primary)" innerCircleColor="var(--primary9)" ariaLabel="Loading, please wait..."/>
  </Flex>
  )
}

export default Spinner