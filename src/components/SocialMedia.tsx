import React, { FC, useMemo } from "react";
import IconButton from "./common/IconButton";
import { deepTrim } from "@/utils/helpers";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faCodepen } from "@fortawesome/free-brands-svg-icons/faCodepen";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";

type SocialMediaProps = FC<Partial<{
    github: string;
    codepen: string;
    linkedin: string;
}>>

const SocialMedia: SocialMediaProps = (socialMedias) => {

    const media = useMemo(() => [
        {
            name: "GitHub",
            link: socialMedias.github ?? "null",
            icon: faGithub
        },
        {
            name: "CodePen",
            link: socialMedias.codepen ?? "null",
            icon: faCodepen,
        },
        {
            name: "LinkedIn",
            link: socialMedias.linkedin ?? "null",
            icon: faLinkedin
        }
    ], [socialMedias]);

    return (
        <div className="socialMediaGrid">
            {
                media.map((m) => (
                    <IconButton
                        key={deepTrim(`${m.name}-link-button`)}
                        type="link"
                        href={m.link}
                        alt={`Button linked to my ${m.name} profile`}
                    >
                        {m.icon}
                    </IconButton>
                ))
            }
        </div>
    );
}

export default React.memo(SocialMedia);