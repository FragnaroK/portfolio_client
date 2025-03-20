import './style.css';
import { FC } from "react";
import { DefaultComponentProps } from "@Types";
import { Title, BetterButton } from '@Components';
import useFirebase from '@/hooks/useFirebase';

interface FooterProps extends DefaultComponentProps { }

const Footer: FC<FooterProps> = () => {

  return (
    <section id="footer">
      {/* <section>
        <Title subtitle={`v${version}`}>Portfolio</Title>
      </section>
      <section>
        <Title subtitle={`v${dbIteration}`}>Database</Title>
      </section> */}
      <section>
        <Title>Iterations</Title>
        <ul>
          <li>
            <BetterButton
              href="https://v1.francocanalejo.dev"
              type="link"
            >
              v1
            </BetterButton>
          </li>
          <li>
            <BetterButton
              href="https://francocanalejo.dev"
              type="link"
            >
              v2 (Current)
            </BetterButton>
          </li>
        </ul>
      </section>
    </section>
  )
}

export default Footer