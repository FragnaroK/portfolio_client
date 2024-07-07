import { FC, ReactNode, useRef } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './AnimatedStack.css';
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

type RotationDirection = "left" | "right";

interface AnimatedStackProps extends DefaultComponentProps<ReactNode[][]> {
  radius?: number[];
  speed?: number[];
  label?: string;
  direction?: RotationDirection[];
}

interface AnimatedStackRingProps {
  ring: ReactNode[];
  index: number;
  radius: number;
  speed: number;
  direction: RotationDirection;
  scrollProgress: MotionValue<number>;
}

interface AnimatedStackItemProps extends Omit<Partial<AnimatedStackRingProps>, "index" | "scrollProgress" | "ring"> {
  children: ReactNode;
  index: number;
  total: number;
  rotate: MotionValue<number>;
}

const AnimatedStackItem: FC<AnimatedStackItemProps> = ({ children, rotate, index, total, speed = 1, radius = 250, direction = "left" }) => {

  const itemRef = useRef<HTMLDivElement>(null);

  const
    rotation = index * ((360) / total),
    reverseRotation = direction === "left" ? -(360 * speed) : (360 * speed),
    itemContainerStyles = {
      left: `calc(50% + ${radius}px)`,
      rotate: `${rotation}deg`,
      transformOrigin: `-${radius}px 0px`,
    }

  const itemRotationFix = useTransform(rotate, [0, 1], [`rotate(${reverseRotation - (rotation)}deg)`, `rotate(${-(rotation)}deg)`]);

  return (
    <div className="animatedStackItem" ref={itemRef} style={itemContainerStyles}>
      <motion.div className="animatedStackItemContentWrapper" style={{
        rotate: `-${rotation}deg`,
        transform: itemRotationFix,
      }}>
        {children}
      </motion.div>
    </div>
  )
}

const AnimatedStackRing: FC<AnimatedStackRingProps> = ({
  ring, scrollProgress, index, direction, speed, radius
}) => {

  const finalSpeed = 360 * speed;
  const rotate = useTransform(scrollProgress, [0, 1], [0, (direction === "left" ? -finalSpeed : finalSpeed)])

  return (
    <motion.div className="animatedStackRing" key={`animatedStackRing${index}}`} style={{ rotate }}>
      {
        ring?.map((item, i) => (
          <AnimatedStackItem
            key={`stackitem-${index}-${i}`}
            index={i}
            speed={speed}
            radius={radius}
            total={ring.length}
            direction={direction}
            rotate={scrollProgress}
          >
            {item}
          </AnimatedStackItem>)
        )
      }
    </motion.div>
  )
}

const AnimatedStack: FC<AnimatedStackProps> = ({
  label, children, speed = [55], radius = [250], direction = ['right']
}) => {

  const
    ref = useRef<HTMLDivElement>(null),
    { scrollYProgress } = useScroll();

  const height = `${radius.reduce((prev, curr) => prev < curr ? curr : prev, 0) * 3}px`;

  return (
    <div className="animatedStack" ref={ref} style={{ height }}>
      {label && <h3 className="label">{label}</h3>}
      {
        children?.map((ring, ringIndex) => {

          const
            finalRadius = radius[ringIndex] ?? radius[0] * ((children.length - ringIndex) / children.length),
            finalSpeed = speed[ringIndex] ?? speed[0],
            finalDirection = direction[ringIndex] ?? ringIndex % 2 == 0 ? "right" : "left";

          return (
            <AnimatedStackRing
              key={`ring${ringIndex}${finalDirection}${finalSpeed}${finalRadius}`}
              ring={ring}
              index={ringIndex}
              speed={finalSpeed}
              radius={finalRadius}
              direction={finalDirection}
              scrollProgress={scrollYProgress}
            />
          )
        })
      }
    </div>
  )
}

export default AnimatedStack