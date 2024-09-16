import './style.css';
import { FC, useRef } from "react";
import { DefaultComponentProps } from "@Types";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { useInView } from 'framer-motion';

interface IconProps extends Omit<DefaultComponentProps<undefined>, "onClick">, FontAwesomeIconProps {
  label?: string;
  index?: number;
  total?: number;
  inViewAnimation?: boolean;
}

const Icon: FC<IconProps> = ({ style,  icon, label, index, inViewAnimation = false,  total, ...faProps }) => {

  const iconRef = useRef<HTMLDivElement>(null);
  const inView = useInView(iconRef, { once: true });

  return (
    <div className='iconWrapper' style={style} ref={iconRef}>
      <FontAwesomeIcon icon={icon} className="icon" {...faProps} style={{
        ...style,
        animation: index && total && inViewAnimation? `Fade${inView ? "In" : "Out"} .8s  cubic-bezier(0.68, -0.55, 0.265, 1.55) 1 normal both` : undefined
      }} />
      {label && <p><strong>{label}</strong></p>}
    </div>
  )
}

export default Icon;