import { dependencies, devDependencies, version, author, homepage } from '../package.json';

declare global {
    interface Window {
        stats: () => void;
    }
    interface Console {
        clean: () => void;
    }
}

function showDeps(label: string, depsList: { [key: string]: string }) {
    const title = `${colors.underline}${colors.bold}${label}${colors.r}:`;
    const list = Object.keys(depsList).map((dep) => `\n\t\t- ${colors.bold}${dep}:${colors.r} ${colors.green}${depsList[dep]}${colors.r}`).join();
    return `
    ${title}
        ${list}
    `
}

const isChrome = !!(window as any).chrome;

const colors = {
    r: isChrome ? "\x1b[0m" : '',
    red: isChrome ? "\x1b[31m" : '',
    green: isChrome ? "\x1b[32m" : '',
    yellow: isChrome ? "\x1b[33m" : '',
    blue: isChrome ? "\x1b[34m" : '',
    magenta: isChrome ? "\x1b[35m" : '',
    cyan: isChrome ? "\x1b[36m" : '',
    white: isChrome ? "\x1b[37m" : '',
    gray: isChrome ? "\x1b[90m" : '',
    grey: isChrome ? "\x1b[90m" : '',
    bold: isChrome ? "\x1b[1m" : '',
    dim: isChrome ? "\x1b[2m" : '',
    italic: isChrome ? "\x1b[3m" : '',
    underline: isChrome ? "\x1b[4m" : '',
    inverse: isChrome ? "\x1b[7m" : '',
    hidden: isChrome ? "\x1b[8m" : '',
    strikethrough: isChrome ? "\x1b[9m" : '',
}

const [vite, ts, postcss, firebase, github] = [
    `${colors.cyan}Vite`,
    `${colors.blue}TypeScript`,
    `${colors.red}PostCSS`,
    `${colors.yellow}Firebase`,
    `${colors.magenta}GitHub`
]

const deps = showDeps('Dependencies', dependencies),
    devDeps = showDeps('Dev dependencies', devDependencies);

const info = `
    ${colors.underline}Author${colors.r}:  ${author.name}
    ${colors.underline}Email${colors.r}:   ${author.email}
    ${colors.underline}Website${colors.r}: ${author.url}
    ${colors.underline}Project${colors.r}: ${homepage}

    ${colors.underline}Debug${colors.r}: ${import.meta.env.DEV ? 'enabled' : 'disabled'}
`
const banner = `
                     ${vite} ${ts} ${postcss} ${firebase} ${github}${colors.red}
    ███████ ██████   █████   ██████  ███    ██  █████  ██████   ██████  ██   ██
    ██      ██   ██ ██   ██ ██       ████   ██ ██   ██ ██   ██ ██    ██ ██  ██ 
    █████   ██████  ███████ ██   ███ ██ ██  ██ ███████ ██████  ██    ██ █████  
    ██      ██   ██ ██   ██ ██    ██ ██  ██ ██ ██   ██ ██   ██ ██    ██ ██  ██ 
    ██      ██   ██ ██   ██  ██████  ██   ████ ██   ██ ██   ██  ██████  ██   ██
                                                                               
                                    (v${version}) ${colors.r} 

     Hey there! Welcome to my website's devtools. Run 'stats()' to learn more.
  `;

window.stats = () => console.log(`${info}\n${deps}\n${devDeps}`);
console.clean = () => {
    console.clear();
    console.log(banner);
}

export { }