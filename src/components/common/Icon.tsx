import '@Styles/common/Icon.css';
import { FC, useRef } from "react";
import { DefaultComponentProps, ExtendedCSSProperties } from "@Types";
import { useInView } from 'framer-motion';
import { IconDefinition } from '@Constants/icons';
import classNames from 'classnames';

interface IconProps extends Omit<DefaultComponentProps<undefined>, "onClick"> {
  icon: IconDefinition;
  label?: string;
  index?: number;
  total?: number;
  style?: ExtendedCSSProperties;
  inViewAnimation?: boolean;
}

const Icon: FC<IconProps> = ({ style,  icon, label, index, inViewAnimation = false,  total }) => {

  const iconRef = useRef<HTMLDivElement>(null);
  const inView = useInView(iconRef, { once: true });

  return (
    <div className='iconWrapper' style={style} ref={iconRef}>
      <span className={classNames(icon.className, "icon")} style={{
        ...style,
        animation: index && total && inViewAnimation? `Fade${inView ? "In" : "Out"} .8s  cubic-bezier(0.68, -0.55, 0.265, 1.55) 1 normal both` : undefined
      }}/>
      {label && <p><strong>{label}</strong></p>}
    </div>
  )
}

export default Icon;