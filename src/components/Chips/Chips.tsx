import { FC } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './Chips.css';
import { deepTrim } from "@Utils/helpers";

type ChipsPosition = "left" | "center" | "right";

interface ChipsProps extends DefaultComponentProps<undefined> {
  label: string;
  chips: string[];
  gap?: number;
  position?: ChipsPosition;
}

interface ChipProps {
  children: string;
}

const getPosition = (position: ChipsPosition) => {
  if (position === "left") return "flex-start";
  if (position === "right") return "flex-end";
  return "center";
}

export const Chip: FC<ChipProps> = ({ children }) => <small className="chip">{children}</small>

const Chips: FC<ChipsProps> = ({
  chips, gap, position, label
}) => {
  const justifyContent = getPosition(position ?? "center");

  return (
    <div className="chipsWrapper" style={{ gap, justifyContent }}>
      {
        chips.map((chip, i) => <Chip key={deepTrim(`chip-${chip}-${label}-${i}`)}>{chip}</Chip>)
      }
    </div>
  )
}

export default Chips