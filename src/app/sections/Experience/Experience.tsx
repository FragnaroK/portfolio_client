import { FC, useRef } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './Experience.css';
import Title from '@Components/Title/Title';
import Flex from '@Components/Flex/Flex';
import Card from '@Components/Card/Card';
import { faCertificate, faNewspaper } from "@fortawesome/free-solid-svg-icons";

interface ExperienceProps extends DefaultComponentProps { }

const Experience: FC<ExperienceProps> = ({
  id, className, style, onClick, children
}) => {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section id="experience" ref={sectionRef}>
      <section className="cardGrid">
        <Flex flexDirection="column" gap={15} fill>
          <Title>Experience</Title>
          <Card
            title="Multimedia Developer"
            subtitle="TAFE Queensland &mdash; Australia &mdash; 2022 to Present"
            label=""
            fill
            actions={[{ href: "#", type: "link", icon: faNewspaper, children: "TAFE Queensland post" }]}
          ></Card>
        </Flex>
        <Flex flexDirection="column" gap={15} fill>
          <Title>Education</Title>
          <Card
            title="Skills for Education and Employment"
            subtitle="TAFE Queensland &mdash; Australia &mdash; 2021 to 2022"
            label=""
            fill
            actions={[{ href: "#", type: "link", icon: faNewspaper, children: "TAFE Queensland post" }]}
          ></Card>
          <Card
            title="Frontend Developer"
            subtitle="Platzi &mdash; Remote &mdash; 2020 to 2022"
            fill
            label=""
            actions={[{ href: "#", type: "link", icon: faCertificate, children: "Platzi Certificate" }]}
          ></Card>
          <Card
            title="Programming Technician"
            subtitle="Universidad Tecnologica Nacional &mdash; Argentina &mdash; 2018 to 2021"
            >
              <br />
              <p>Unfinished due to moving from Argentina to Australia</p>
            </Card>
        </Flex>
      </section>
    </section>
  )
}

export default Experience