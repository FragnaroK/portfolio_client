import { FC, ReactNode, useRef } from "react";
import { DefaultComponentProps } from "@Types";
import "./style.css";
import { useInView } from "framer-motion";
import Picture from '@Assets/ProfilePicture.svg?react';
import classNames from "classnames";

interface ProfilePhotoProps extends DefaultComponentProps {
	label?: string;
}

const ProfilePhoto: FC<ProfilePhotoProps> = ({ id, className, style, label }) => {
	const profilePhotoRef = useRef<HTMLDivElement>(null);
	const inView = useInView(profilePhotoRef, {
		margin: "-50px 0px -50px 0px",
		once: true
	});

	return (
		<div className={classNames('profilePhotoWrapper', className, inView ? "show" : "not-show")} id={id} style={style} ref={profilePhotoRef}>
			<ProfilePhotoImage svg={<Picture/>} />
			{label ? <ProfilePhotoLabel label={label} /> : null}
		</div>
	);
};

const ProfilePhotoImage: FC<DefaultComponentProps & { img?: string, svg?: ReactNode}> = ({ img, svg }) => {
	return (
		<div className="profilePhoto">
			{img && <img src={img} alt='sample' />}
			{svg }
		</div>
	)
};

const ProfilePhotoLabel: FC<DefaultComponentProps> = ({ label = "" }) => {
	return (
		<div className="profilePhotoLabel">
			<p>{label as string}</p>
		</div>
	)
};

export default ProfilePhoto;
