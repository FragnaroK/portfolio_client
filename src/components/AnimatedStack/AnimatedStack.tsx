import { FC,  ReactNode,  useRef } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './AnimatedStack.css';

type RotationDirection = "left" | "right";

interface AnimatedStackProps extends DefaultComponentProps<ReactNode[][]> {
  radius?: number[];
  speed?: number[];
  label?: string;
  direction?: RotationDirection[];
}

interface AnimatedStackItemProps {
  children: ReactNode;
  index: number;
  total: number;
  radius?: number;
  speed?: number;
  direction?: RotationDirection
} 

export const AnimatedStackItem: FC<AnimatedStackItemProps> = ({children, index, total, speed = 55, radius = 250, direction = "left"}) => {

  const itemRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="animatedStackItem" ref={itemRef} style={{
      left: `calc(50% + ${radius}px)`,
      animationDuration: `${speed}s, 1s`,
      animationDelay: `${(index) * ((speed / total) )}s`,
      animationDirection: `${direction === "left" ? "reverse" : "normal"}, normal`,
      transformOrigin: `-${radius}px 0px`
    }}>
      <div className="animatedStackItemContentWrapper" style={{
        animationDuration: `${speed}s`,
        animationDelay: `${(index) * ((speed / total))}s`,
        animationDirection: direction === "left" ? "reverse" : "normal"
      }}>
        {children}
      </div>
    </div>
  )
}


const AnimatedStack: FC<AnimatedStackProps> = ({
  id, className, style, onClick, label, children, speed = [55], radius = [250], direction = ["right"]
}) => {

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="animatedStack" ref={ref} style={{
      height: `${radius.reduce((prev, curr) => prev < curr ? curr : prev, 0) * 2.2}px`
    }}>
      {label && <h3 className="label">{label}</h3>}
      {
        children?.map((ring, ringIndex) => {

          const finalRadius = radius[ringIndex] ?? radius[0] * ((children.length - ringIndex) / children.length);
          const finalSpeed = speed[ringIndex] ?? speed[0];
          const finalDirection = direction[ringIndex] ?? ringIndex % 2 == 0 ? "right" : "left"

          return (
            <div className="animatedStackRing" key={`animatedStackRing${ringIndex}}`}>
              {
                ring?.map((item, i) => <AnimatedStackItem key={`stackitem-${ringIndex}-${i}`} index={i} direction={finalDirection} speed={finalSpeed} radius={finalRadius} total={ring.length}>{item}</AnimatedStackItem>)
              }
            </div>
        )
        })
      }
    </div>
  )
}

export default AnimatedStack