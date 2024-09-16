import './style.css';
import { FC, ReactNode} from "react";
import { DefaultComponentProps } from "@Types";
import { deepTrim } from "@Utils/helpers";

interface AccordionProps extends DefaultComponentProps<ReactNode | string | ReactNode[], undefined> {
  label: string;
}

const Accordion: FC<AccordionProps> = ({
  label, children
}) => {

  const id = `accordion${deepTrim(label)}`;

  return (
    <section className="accordionWrapper">
      <details id={id}>
        <summary>{label}</summary>
        <article title={`Accordion content: ${label}`} >
          <main>
            {children}
          </main>
        </article>
      </details>
     </section>
  )
}

export default Accordion