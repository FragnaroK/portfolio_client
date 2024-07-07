import { FC, useCallback, useMemo } from "react";
import { DefaultComponentProps } from "@Types/Types";
import './Email.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCheck, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Text from "@Components/Text/Text";
import { usePopUpContext } from "@Context/PopUpContext/PopUpContextHook";
import { useNotificationContext } from "@Context/NotificationContext/NotificationContextHook";

interface EmailProps extends DefaultComponentProps<string, HTMLAnchorElement> { }

const Email: FC<EmailProps> = ({ children, ...props }) => {
  if (!children?.includes("@")) throw new Error("Invalid email provided");

  const
    popup = usePopUpContext(),
    { fakeLoadingNotify } = useNotificationContext(),
    popupContent = useMemo(() => ({
      title: "Send email",
      subtitle: `Mail to '${children}'`,
      children: (
        <Text>
          <p>This will open your device's email provider, are you sure you want to continue?</p>
        </Text>
      ),
      label: " ",
      actions: [
        {
          icon: faCancel,
          singleIcon: true,
          children: "No",
          onClick: () => popup.hide(),
          hoverColor: "var(--destructive)"
        },
        {
          icon: faCheck,
          singleIcon: true,
          children: "Yes",
          onClick: () => {
            window.location.href = `mailto:${children}`;
            fakeLoadingNotify("success", "Opening email provider...", "Done!", 2500);
            popup.hide();
          },
          hoverColor: "var(--success)"
        }
      ]
    }), [children, popup, fakeLoadingNotify]);

  const onClickHandler: React.MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    e.preventDefault();
    popup.show(popupContent);
  }, [popup, popupContent]);

  const emailAddress = children.split("@");

  return (
    <a href={`mailto:${emailAddress.join("@")}`} className="email" onClick={onClickHandler} {...props}>
      <span>{emailAddress[0]}</span>
      <span>@</span>
      <span>{emailAddress[1]}</span>
      <span>
        <FontAwesomeIcon icon={faEnvelope} />
      </span>
    </a>
  );
};

export default Email;
