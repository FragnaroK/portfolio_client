import './Footer.css';
import { FC } from "react";
import { DefaultComponentProps } from "@Types/Types";
import { useFirebaseContext } from '@Context/FirebaseContext/FirebaseContextHooks';
import Title from '@Components/Title/Title';
import BetterButton from '@Components/Button/BetterButton';

interface FooterProps extends DefaultComponentProps { }

const Footer: FC<FooterProps> = ({
  id, className, style, onClick, children
}) => {

  const { database: { snap } } = useFirebaseContext();

  const version = snap?.meta.version;
  const dbIteration = snap?.meta.db_iteration;

  return (
    <section id="footer">
      <section>
        <Title subtitle={`v${version}`}>Portfolio</Title>
      </section>
      <section>
        <Title subtitle={`v${dbIteration}`}>Database</Title>
      </section>
      <section>
        <Title>Iterations</Title>
        <ul>
          <li>
            <BetterButton 
              href="https://francocanalejo-fragnarok.firebaseapp.com/"
              type="link"
            >v2.0.0</BetterButton>
          </li>
        </ul>
      </section>
    </section>
  )
}

export default Footer