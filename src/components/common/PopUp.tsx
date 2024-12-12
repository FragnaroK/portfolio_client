import '@Styles/common/PopUp.css';
import { FC } from "react";
import Card, { CardProps } from "@/components/common/Card";

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