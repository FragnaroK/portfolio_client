import { isNumber } from "lodash";

const specialChars = new RegExp(/[\s\n\t'"$#*&^!%@)(+=[\];:,~`>\\</?.{}]/g);

export const wait = (time: number = 1500) => new Promise<void>((res) => {setTimeout(() => {res()}, time)});
export const isEven = (n: number) => n % 2 === 0;
export const deepTrim = (text: string, escape: boolean = true) => text.trim().replace(escape ? specialChars : / /g, '');
export const escapeSpecialChars = (text: string) => text.trim().replace(specialChars, '');

export const una_forma = (t: string): string => {
    const tp = parseInt(t[0]);
    if (!isNumber(tp) || isNaN(tp)) return t;
    let d = t.slice(1);
    for (let i = 0; i < tp; i++) {
       d = atob(d);
    }
    return d;
};

export const matata = JSON.parse;
export const de_ser = import.meta.env.VITE_DV_CONFIG;