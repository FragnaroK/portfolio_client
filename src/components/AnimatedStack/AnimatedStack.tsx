import './AnimatedStack.css';
import { FC, ReactNode, useRef } from "react";
import { DefaultComponentProps, ExtendedCSSProperties } from "@Types/Types";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { deepTrim, isEven } from '@Utils/helpers';

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
  ringIndex: number;
  rotate: MotionValue<number>;
}

const AnimatedStackItem: FC<AnimatedStackItemProps> = ({ children, ringIndex, rotate, index, total, speed = 1, radius = 250, direction = "left" }) => {

  const itemRef = useRef<HTMLDivElement>(null);

  const
    rotation = (index * (360 / total)),
    initialRotation = rotation - (isEven(ringIndex) ? 180 : 0),
    reverseRotation = direction === "left" ? -(360 * speed) : (360 * speed),
    itemContainerStyles = {
      '--item-rotation: ': `-${rotation}deg`,

      left: `calc(50% + ${radius}px)`,
      rotate: `${rotation}deg`,
      transformOrigin: `-${radius}px 0px`,
    } as ExtendedCSSProperties

  const itemRotationFix = useTransform(rotate, [0, 1], [`rotate(${(reverseRotation - initialRotation)}deg)`, `rotate(${-(initialRotation)}deg)`]);

  return (
    <div className="animatedStackItem" ref={itemRef} style={itemContainerStyles}>
      <motion.div className="animatedStackItemContentWrapper" style={{ transform: itemRotationFix }}>
        {children}
      </motion.div>
    </div>
  )
}

const AnimatedStackRing: FC<AnimatedStackRingProps> = ({
  ring, scrollProgress, index, direction, speed, radius
}) => {

  const finalSpeed = 360 * speed;
  const rotate = useTransform(scrollProgress, [0, 1], ['rotate(0deg)', (direction === "left" ? `rotate(${-finalSpeed}deg)` : `rotate(${finalSpeed}deg)`)])

  return (
    <motion.div className="animatedStackRing" key={`animatedStackRing${index}}`} style={{ transform: rotate }}>
      {
        ring?.map((item, i) => (
          <AnimatedStackItem
            key={`stackitem-${index}-${i}`}
            index={i}
            speed={speed}
            radius={radius}
            ringIndex={index}
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
  label, children, speed = [55], radius = [250], direction = ['right'], style
}) => {

  const
    ref = useRef<HTMLDivElement>(null),
    { scrollYProgress } = useScroll();

  const height = `${radius.reduce((prev, curr) => prev < curr ? curr : prev, 0) * 3}px`;

  return (
    <div className="animatedStack" ref={ref} style={{ height, ...style }}>
      {label && <h3 className="label">{label}</h3>}
      {
        children?.map((ring, ringIndex) => {

          const
            finalRadius = radius[ringIndex] ?? radius[0] * ((children.length - ringIndex) / children.length),
            finalSpeed = speed[ringIndex] ?? speed[0],
            finalDirection = direction[ringIndex] ?? ringIndex % 2 == 0 ? "right" : "left";

          return (
            <AnimatedStackRing
              key={deepTrim(`ring${ringIndex}${finalDirection}${finalSpeed}${finalRadius}`)}
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