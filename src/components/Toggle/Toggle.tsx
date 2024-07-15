import { FC, useCallback, useMemo } from "react";
import { DefaultComponentProps, ExtendedCSSProperties } from "@Types/Types";
import './Toggle.css';
import { faCircle, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Logger from "node-logger-web";
 

interface ToggleProps extends DefaultComponentProps<string, HTMLInputElement> {
  initial?: IconDefinition;
  target?: IconDefinition;
  disabled?: boolean;
}

const Toggle: FC<ToggleProps> = ({
  id, className = "", style, onClick, children,
  initial, target, disabled = false
}) => {

  const log = new Logger("ToggleComponent",   import.meta.env.DEV );

  const defaultStyles = useMemo(() => ({
    ...style,
    "--initial-icon": `'\\${(initial ?? faCircle).icon[3]}'`,
    "--target-icon": `'\\${(target ?? faCircle).icon[3]}'`
  } as ExtendedCSSProperties), [initial, style, target])

  const onToggleClicked: React.MouseEventHandler<HTMLInputElement> = useCallback((e) => {
    log.d("Toggle clicked! -> ", e);
    onClick && onClick(e);
  }, [onClick])

  return (
    <label className={`toggleWrapper ${className}`} style={defaultStyles} id={id}>
      <input type="checkbox" name={children} onClick={onToggleClicked} disabled={disabled}/>
      <span className="slide-checkbox"></span>
    </label>
  )
}

export default Toggle