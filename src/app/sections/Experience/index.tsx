import './style.css';
import { FC, useRef } from "react";
import { DefaultComponentProps } from "@Types";
import { Education, WorkExperience } from '@Type/database';

import { Title, Flex, Card, Spinner } from '@Components';
import { deepTrim } from "@Utils/helpers";
import useFirebase from '@/hooks/useFirebase';
import { IconMeta } from '@/constants/icons';


interface ExperienceProps extends DefaultComponentProps { }

type ActionType = 'post' | 'certificate' | undefined
function getActionIcon(type: ActionType = "certificate") {
  return type === "certificate" ? IconMeta.faCertificate : IconMeta.faNewspaper;
}

function sortByYear<TypeOfExperience = WorkExperience | Education>(arr: (WorkExperience | Education)[]): TypeOfExperience[] {
  return arr.sort((a, b) => Number.parseInt(b.endDate) - Number.parseInt(a.endDate)) as TypeOfExperience[]
}

const Experience: FC<ExperienceProps> = () => {
  const { database: { snap } } = useFirebase();
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
                collapsable={`Learn more about this role`}
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
                {
                  job.responsibilities.map((resp) => (<p key={deepTrim(`JobCard-${job.company}-${job.position}-${resp}`)}>{resp}</p>))
                }
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