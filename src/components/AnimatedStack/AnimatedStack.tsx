import { FC,  ReactNode,  useRef } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './AnimatedStack.css';

interface AnimatedStackProps extends DefaultComponentProps<ReactNode[]> {
  radius?: number;
  speed?: number;
}

interface AnimatedStackItemProps {
  children: ReactNode;
  index: number;
  total: number;
  radius?: number;
  speed?: number;
} 

export const AnimatedStackItem: FC<AnimatedStackItemProps> = ({children, index, total, speed = 15, radius = 200}) => {

  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div className="animatedStackItem" ref={itemRef} style={{
      left: `calc(50% + ${radius}px)`,
      animationDuration: `${speed}s, 1s`,
      animationDelay: `${(index) * ((speed / total) )}s`,
      transformOrigin: `-${radius}px 0px`
    }}>{children}</div>
  )
}


const AnimatedStack: FC<AnimatedStackProps> = ({
  id, className, style, onClick, children, speed, radius
}) => {

  return (
    <div className="animatedStack">
      {
        children?.map((child, i) => <AnimatedStackItem key={`stackitem-${i}`} index={i} speed={speed} radius={radius} total={children.length}>{child}</AnimatedStackItem>)
      }
    </div>
  )
}

export default AnimatedStack