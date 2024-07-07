export const wait = (time: number = 1500) => new Promise<void>((res) => {setTimeout(() => {res()}, time)});
export const deepTrim = (text: string) => text.trim().replace(' ', '-');
