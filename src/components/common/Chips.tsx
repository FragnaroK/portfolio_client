import '@Styles/common/Chips.css';
import { FC } from "react";
import { DefaultComponentProps } from "@Types";
import { deepTrim } from "@Utils/helpers";
import classNames from 'classnames';

type ChipsPosition = "left" | "center" | "right";

interface ChipsProps extends DefaultComponentProps<undefined> {
  label: string;
  chips: string[];
  gap?: number;
  position?: ChipsPosition;
  notranslate?: boolean;
}

interface ChipProps {
  children: string;
  notranslate?: boolean;
}

const getPosition = (position: ChipsPosition) => {
  if (position === "left") return "flex-start";
  if (position === "right") return "flex-end";
  return "center";
}

export const Chip: FC<ChipProps> = ({ children, notranslate }) => <small className={classNames('chip', { 'notranslate': notranslate })}>{children}</small>

const Chips: FC<ChipsProps> = ({
  chips, gap, position, label, notranslate
}) => {
  const justifyContent = getPosition(position ?? "center");

  return (
    <div className="chipsWrapper" style={{ gap, justifyContent }}>
      {
        chips.map((chip, i) => <Chip key={deepTrim(`chip-${chip}-${label}-${i}`)} notranslate={notranslate}>{chip}</Chip>)
      }
    </div>
  )
}

export default Chips