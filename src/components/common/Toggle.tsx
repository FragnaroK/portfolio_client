import '@Styles/common/Toggle.css';
import { FC, useCallback, useMemo } from "react";
import { DefaultComponentProps, ExtendedCSSProperties } from "@Types";
import Logger from "node-logger-web";
import { deepTrim } from "@Utils/helpers";
import uniqueId from "lodash/uniqueId";
import classNames from "classnames";
import { IconMeta, IconDefinition } from "@Constants/icons";
 

interface ToggleProps extends DefaultComponentProps<string, HTMLInputElement> {
  initial?: IconDefinition;
  target?: IconDefinition;
  disabled?: boolean;
  title: string,
}

const Toggle: FC<ToggleProps> = ({
  id = uniqueId(), className = "", style, onClick, children,
  initial, target, title, disabled = false
}) => {

  const log = new Logger("Toggle::component", import.meta.env.DEV );

  const defaultStyles = useMemo(() => ({
    ...style,
    "--initial-icon": `'\\${(initial ?? IconMeta.faCircle).unicode}'`,
    "--target-icon": `'\\${(target ?? IconMeta.faCircle).unicode}'`
  } as ExtendedCSSProperties), [initial, style, target])

  const onToggleClicked: React.MouseEventHandler<HTMLInputElement> = useCallback((e) => {
    log.d("Toggle clicked! -> ", e);
    onClick?.(e);
  }, [onClick])

  return (
    <label className={classNames('toggleWrapper', className)} style={defaultStyles} id={deepTrim(`${id}-${title}`)}>
      <input type="checkbox" name={deepTrim(children ?? '')} onClick={onToggleClicked} disabled={disabled} title={`"toggle checkbox: ${title}"`}/>
      <span className="slide-checkbox"></span>
    </label>
  )
}

export default Toggle