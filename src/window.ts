import { dependencies, devDependencies, version, author, homepage } from '../package.json';

declare global {
    interface Window {
        stats: () => void;

    }
}

const colors = {
    r: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    gray: "\x1b[90m",
    grey: "\x1b[90m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    underline: "\x1b[4m",
    inverse: "\x1b[7m",
    hidden: "\x1b[8m",
    strikethrough: "\x1b[9m",
}

function showDeps(label: string, depsList: { [key: string]: string }) {
    const title = `${colors.underline}${colors.bold}${label}${colors.r}:`;
    const list = Object.keys(depsList).map((dep) => `\n\t\t- ${colors.bold}${dep}:${colors.r} ${colors.green}${depsList[dep]}${colors.r}`).join();
    return `
    ${title}
        ${list}
    `
}

const info = `
    ${colors.underline}Author${colors.r}:  ${author.name}
    ${colors.underline}Email${colors.r}:   ${author.email}
    ${colors.underline}Website${colors.r}: ${author.url}
    ${colors.underline}Project${colors.r}: ${homepage}
`
const deps = showDeps('Dependencies', dependencies);
const devDeps = showDeps('Dev dependencies', devDependencies);
window.stats = () => console.log(`${info}\n${deps}\n${devDeps}`);

const vite = `${colors.cyan}Vite`;
const ts = `${colors.blue}TypeScript`;
const postcss = `${colors.red}PostCSS`;
const firebase = `${colors.yellow}Firebase`;
const github = `${colors.magenta}GitHub`;

console.log(`
                     ${vite} ${ts} ${postcss} ${firebase} ${github}${colors.red}
    ███████ ██████   █████   ██████  ███    ██  █████  ██████   ██████  ██   ██ 
    ██      ██   ██ ██   ██ ██       ████   ██ ██   ██ ██   ██ ██    ██ ██  ██  
    █████   ██████  ███████ ██   ███ ██ ██  ██ ███████ ██████  ██    ██ █████   
    ██      ██   ██ ██   ██ ██    ██ ██  ██ ██ ██   ██ ██   ██ ██    ██ ██  ██  
    ██      ██   ██ ██   ██  ██████  ██   ████ ██   ██ ██   ██  ██████  ██   ██ 
                                                                                
                                    (v${version}) ${colors.r} 

     Hey there! welcome to my website's devtools. Run 'stats()' to learn more.
  `)

// const webLog = new Logger('francocanalejo.com', false);

export {}