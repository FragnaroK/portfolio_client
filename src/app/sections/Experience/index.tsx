import './style.css';
import { FC, useRef } from "react";
import { DefaultComponentProps } from "@Types";
import { Education, WorkExperience } from '@Type/database';

import { Title, Flex, Card, Spinner } from '@Components';
import { faCertificate, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useFirebaseContext } from "@/context/Firebase/hooks";
import { deepTrim } from "@Utils/helpers";
// Education, WorkExperience, 
interface ExperienceProps extends DefaultComponentProps { }

type ActionType = 'post' | 'certificate' | undefined
function getActionIcon(type: ActionType = "certificate") {
  return type === "certificate" ? faCertificate : faNewspaper;
}

function sortByYear<TypeOfExperience = WorkExperience | Education>(arr: (WorkExperience | Education)[]): TypeOfExperience[] {
  return arr.sort((a, b) => parseInt(b.endDate) - parseInt(a.endDate)) as TypeOfExperience[]
}

const Experience: FC<ExperienceProps> = () => {
  const { database: { snap } } = useFirebaseContext();
  const sectionRef = useRef<HTMLElement>(null);

  const workExperience = sortByYear<WorkExperience>(snap?.info?.professional.workExperience ?? []);
  const education = sortByYear<Education>(snap?.info?.professional.education ?? []);

  return (
    <section id="experience" ref={sectionRef}>
      <section className="cardGrid">
        <Flex flexDirection="column" gap={15} fill>
          <Title>Experience</Title>
          {snap ?
            workExperience?.map((job) => (
              <Card
                collapsable={`Learn more about the '${job.position}' role`}
                fill
                key={deepTrim(`JobCard-${job.company}-${job.position}`)}
                title={job.position}
                subtitle={`${job.company} — ${job.location} — ${job.startDate} to ${job.endDate}`}
                label=""
                actions={job.ref && [
                  { href: job.ref.link, type: "link", icon: getActionIcon(job.ref.type as ActionType), children: job.ref.label }
                ]}
              >
                <h3>About the role</h3>
                <ul>
                  {
                    job.responsibilities.map((resp) => (<li key={deepTrim(`JobCard-${job.company}-${job.position}-${resp}`)}>{resp}</li>))
                  }
                </ul>
                <h3>Achievements</h3>
                <ul>
                  {
                    job.achievements.map((achi) => (<li key={deepTrim(`JobCard-${job.company}-${job.position}-${achi}`)}>{achi}</li>))
                  }
                </ul>
              </Card>
            ))
            : (<Spinner />)
          }
        </Flex>
        <Flex flexDirection="column" gap={15} fill>
          <Title>Education</Title>
          {snap ?
            education?.map((course) => (
              <Card
                fill
                key={deepTrim(`JobCard-${course.institution}-${course.degree}`)}
                title={course.degree}
                subtitle={`${course.institution} — ${course.location} — ${course.startDate} to ${course.endDate}`}
                label=""
                actions={course.ref && [
                  { href: course.ref.link, type: "link", icon: getActionIcon(course.ref.type as ActionType), children: course.ref.label }
                ]}
              />
            ))
            : (<Spinner />)
          }
        </Flex>
      </section>
    </section>
  )
}

export default Experience