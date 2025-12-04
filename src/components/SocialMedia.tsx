import React, { FC, useMemo } from "react";
import IconButton from "./common/IconButton";
import { deepTrim } from "@/utils/helpers"; 
import { IconMeta } from "@Constants/icons";

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
            icon: IconMeta.faGithub.className,
        },
        {
            name: "CodePen",
            link: socialMedias.codepen ?? "null",
            icon: IconMeta.faCodepen.className,
        },
        {
            name: "LinkedIn",
            link: socialMedias.linkedin ?? "null",
            icon: IconMeta.faLinkedin.className,
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