import { CSSProperties, MouseEventHandler } from "react";

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

export * as DatabaseStructure from './database.types';
export * as RouteTypes from './routes.types';