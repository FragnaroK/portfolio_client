import { FC } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './Chips.css';

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

const Chip: FC<ChipProps> = ({ children }) => <small className="chip">{children}</small>

const Chips: FC<ChipsProps> = ({
  chips, gap, position, label
}) => {

  const justifyContent = getPosition(position ?? "left");

  return (
    <div className="chipsWrapper" style={{ gap, justifyContent }}>
      {
        chips.map((chip, i) => <Chip key={`chip-${chip.trim().replace(/\s/g, "")}-${label.trim().replace(/\s/g, "")}-${i}`}>{chip}</Chip>)
      }
    </div>
  )
}

export default Chips