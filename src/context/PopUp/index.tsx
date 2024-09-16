import { CardProps } from '@/components/Card';
import PopUp from '@/components/PopUp';
import Logger from 'node-logger-web';
import React, { createContext, useState, ReactNode, useCallback, useMemo, useRef, useEffect } from 'react';
import './style.css';
 

interface PopUpContextData {
  show: (content: CardProps) => void;
  hide: () => void;
}

export const PopUpContext = createContext<PopUpContextData | undefined>(undefined);

interface PopUpContextProviderProps {
  children: ReactNode;
}

export const PopUpContextProvider: React.FC<PopUpContextProviderProps> = ({ children }) => {
  const log = new Logger("PopUp::context",   import.meta.env.DEV );

  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [popupContent, setPopupContent] = useState<CardProps | null>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const htmlElementRef = useRef<HTMLHtmlElement | null>(null);

  const focusTrap = useCallback((enable: boolean = true) => {
    if (!mainContentRef.current) return;

    log.d("Content available, selecting all focusable items...");

    const focusable = mainContentRef.current.querySelectorAll<HTMLElement>('input, button, a, textarea, select');

    log.d("Focusable items selected -> ", focusable);
    log.d(`Trap ${enable ? "enabled" : "disabled"}`);

    focusable.forEach((item) => {
      if (item.getAttribute("data-aria-inmutable") === "true") return;
      item.setAttribute("aria-hidden", `${enable}`);
      item.setAttribute("tabindex", enable ? "-1" : "0");
    });
  }, []);

  const show = useCallback((content: CardProps) => {
    if (isShowing) setIsShowing(false);
    setPopupContent(content);
    setIsShowing(true);
    focusTrap();
  }, [focusTrap, isShowing]);

  const hide = useCallback(() => {
    focusTrap(false);
    setIsShowing(false);
  }, [focusTrap]);

  const onCloseAreaClickHandler = () => {
    hide();
  };

  const contextValue: PopUpContextData = useMemo(() => ({
    show,
    hide,
  }), [hide, show]);

  useEffect(() => {
    if (!htmlElementRef?.current) return;
    log.d(`Changing html scroll state to ${!isShowing ? "enabled" : "disabled"}`)
    htmlElementRef.current.style.overflowY = isShowing ? "hidden" : "auto";
  }, [isShowing]);

  useEffect(() => {
     if (!htmlElementRef.current) {
       htmlElementRef.current = document.querySelector('html');
     }
   }, []);

  return (
    <PopUpContext.Provider value={contextValue}>
      <div id="popupContextWrapper" className={isShowing ? "popup-visible" : ""}>
        <div aria-hidden={isShowing ? "true" : "false"} tabIndex={isShowing ? -1 : 0} ref={mainContentRef}>
          {children}
        </div>
        <PopUp show={isShowing} onCloseAreaClick={onCloseAreaClickHandler} {...popupContent} />
      </div>
    </PopUpContext.Provider>
  );
};
