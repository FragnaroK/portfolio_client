import { CSSProperties, FC, ReactNode, useEffect, useState } from "react";
import './AnimatedToggle.css';

type Content = ReactNode | string | JSX.Element;
type Animation = "slideVertical" | "slideHorizontal" | "crossfade" | "slideFadeVertical" | "slideFadeHorizontal"


interface AnimatedToggleProps {
  initial: Content;
  target: Content;
  toggle: boolean;
  animation?: Animation;
  speed?: number;
  delay?: number;
  className?: string;
  easing?: CSSProperties["animationTimingFunction"];
}

const getAnimation = (anim: Animation) => {
  switch (anim) {
    case "crossfade":
      return "fade";
    case "slideHorizontal":
      return "slide horizontal";
    case "slideVertical":
      return "slide vertical";
    case "slideFadeHorizontal":
      return "fade slide horizontal";
    case "slideFadeVertical":
      return "fade slide vertical"
  }
}

const getDirection= (anim: string) => anim.includes('vertical')? ["fromTop", "fromBottom"] : ["fromLeft", "fromRight"]



const AnimatedToggle: FC<AnimatedToggleProps> = ({
  initial, target, toggle, animation = "slideVertical", delay, easing = "ease-in-out", speed, className
}) => {

  const [isToggled, setIsToggled] = useState<boolean>(toggle);

  const animationType = getAnimation(animation);
  const direction = getDirection(animationType)
  const animationSpecs: CSSProperties = {
    transition: `transform ${speed ?? 0.2}s ${easing}, opacity ${speed ?? 0.2}s ${easing}`,
    transitionDelay: `${delay ?? 0}s`
  }


  useEffect(() => {
    setIsToggled(toggle);
  }, [toggle])

  return (
    <span className={`toggleWrapper ${className}`}>
      <span className={`toggleInitial ${animationType} ${direction[0]} ${!isToggled ? "show" : ""}`} style={{
        ...animationSpecs
      }}>
        {initial}
      </span>
      <span className={`toggleTarget ${animationType} ${direction[1]} ${isToggled ? "show" : ""}`} style={{
        ...animationSpecs,
      }}>
        {target}
      </span>
    </span>
  )
}

export default AnimatedToggle