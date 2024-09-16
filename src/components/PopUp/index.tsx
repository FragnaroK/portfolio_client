import { FC } from "react";
import './style.css';
import Card, { CardProps } from "@Component/Card";

export interface PopUpProps extends CardProps {
  show?: boolean;
  onCloseAreaClick?: () => void;
}

const PopUp: FC<PopUpProps> = ({
  id, show = false, onCloseAreaClick = () => {}, ...props
}) => {

  return (
    <div className="popupWrapper" id={id}>
      <dialog className="popup" open={show}>
        <Card {...props} />
      </dialog>
      <div className="closeArea" onClick={onCloseAreaClick}></div>
    </div>
  )
}

export default PopUp