import path from 'path';
/* eslint-disable no-undef */


export const wait = (time = 1500) => new Promise((res) => {setTimeout(() => {res()}, time)});

export const sanitize = (str = "", toLowerCase = false) => (toLowerCase ? str.toLocaleLowerCase() : str).trim().replace(/[^\w\s.-]/gi, '');

/**
 * 
 * @param  {...string} src 
 * @returns 
 */
export const getPath = (...src) => path.join(path.resolve(process.cwd(), ...src));


export const capitalize = (str = "") => `${str[0].toLocaleUpperCase()}${str.slice(1)}`;