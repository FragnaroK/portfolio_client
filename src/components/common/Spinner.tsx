import '@Styles/common/Spinner.css';
import { FC } from "react";
import { DefaultComponentProps } from "@Types";
import Flex from "@/components/common/Flex";
import { ThreeCircles } from "react-loader-spinner";

interface SpinnerProps extends DefaultComponentProps { }

const Spinner: FC<SpinnerProps> = () => {

  return (
  <Flex fill justifyContent="center" alignContent="center" alignItems="center" style={{ height: '100%' }}>
    <ThreeCircles visible color="var(--primary)" innerCircleColor="var(--primary-alpha-50)" ariaLabel="Loading, please wait..."/>
  </Flex>
  )
}

export default Spinner