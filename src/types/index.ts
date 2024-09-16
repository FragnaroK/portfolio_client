import { CSSProperties, MouseEventHandler } from "react";
import * as DatabaseStructure from './database.types';

export interface ExtendedCSSProperties extends CSSProperties {
    [key: string]: any
}

export interface BaseComponentProps {
    className?: string;
    id?: string;
    style?: ExtendedCSSProperties;
}

export interface ViewEvent<T = unknown> extends BaseComponentProps {
    component: DefaultComponentProps<T>;
}

export interface DefaultComponentProps<Children = unknown, ClickEvent = unknown> extends BaseComponentProps {
    children?: Children;
    onClick?: MouseEventHandler<ClickEvent>;
    onView?: (event?: ViewEvent<Children>) => void;
    [key: string]: unknown;
}

export { DatabaseStructure }