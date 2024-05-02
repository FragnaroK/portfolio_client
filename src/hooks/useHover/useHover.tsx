/* eslint-disable react-hooks/exhaustive-deps */
import Logger from 'node-logger-web';
import { useState, useEffect, useCallback } from 'react';

type useHoverOutput = [boolean, () => void];

const useHover = ($elRef: React.RefObject<HTMLDivElement>): useHoverOutput => {

  const log = new Logger("useHover", import.meta.env.VITE_DEBUG_MODE);
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseEnterHandler = useCallback(() => {
    log.d("Mouse hovering -> ", $elRef.current);
    setIsHover(true);
  }, [$elRef])

  const onMouseLeaveHandler = useCallback(() => {
    log.d("Mouse not hovering -> ", $elRef.current);
    setIsHover(false);
  }, [$elRef])

  const addHoverListener = useCallback(() => {
    if (!$elRef?.current) return;

    $elRef.current.addEventListener("mouseenter", onMouseEnterHandler);
    $elRef.current.addEventListener("mouseleave", onMouseLeaveHandler);
  }, [$elRef])

  const removeHoverListener = useCallback(() => {
    if (!$elRef?.current) return;

    $elRef.current.removeEventListener("mouseenter", onMouseEnterHandler);
    $elRef.current.removeEventListener("mouseleave", onMouseLeaveHandler);
  }, [$elRef])

  useEffect(() => {

    addHoverListener();

    return () => {
      if (!$elRef?.current) return;
      $elRef.current?.removeEventListener("mouseenter", onMouseEnterHandler);
      $elRef.current?.removeEventListener("mouseleave", onMouseLeaveHandler);
    }
  }, [$elRef]);

  return [isHover, removeHoverListener];
};

export { useHover };
