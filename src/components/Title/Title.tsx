import { ElementType, FC, HTMLAttributes, useRef } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './Title.css';
import { useInView } from "framer-motion";
import { deepTrim } from "@Utils/helpers";

interface TitleProps extends DefaultComponentProps<string> {
  children: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  subtitle?: string;
}

const Title: FC<TitleProps> = ({
  children, subtitle, level = 1
}) => {

  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, {
    margin: "-50px 0px -50px 0px",
    once: true
  });
  const TitleWrapper = `h${level}` as ElementType<HTMLAttributes<HTMLElement>>;

  const animateText =
    (text: string) => text.split("").map((char, i) =>
      (<span 
        aria-hidden="true"
        data-aria-inmutable="true"
        aria-label={char}
        key={deepTrim(`letter-${char}-from-string-${text}-at-index-${i}`)}
        style={{
          animationDuration: `${i / text.length}s`,
          animationDelay: `${i / (text.length * 2)}s`
        }}
        >{char === " " ? <>&nbsp;</> : char}</span>)
    )

  return (
    <div className="titleWrapper" ref={titleRef}>
      <TitleWrapper aria-label={children}>{inView ? animateText(children) : <span className="hid">{children}</span>}</TitleWrapper>
      {subtitle ? <h2 aria-label={subtitle}>{inView ? animateText(subtitle) : <span className="hid">{subtitle}</span>}</h2> : null}
    </div>
  )
}

export default Title