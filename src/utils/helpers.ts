export const wait = (time: number = 1500) => new Promise<void>((res) => {setTimeout(() => {res()}, time)});
export const isEven = (n: number) => n % 2 === 0;

const specialChars = new RegExp(/[\s\n\t'"$#*&^!%@)(+=[\];:,~`>\\</?.{}]/g);
export const deepTrim = (text: string, escape: boolean = true) => text.trim().replace(escape ? specialChars : / /g, '');
export const escapeSpecialChars = (text: string) => text.trim().replace(specialChars, '')
