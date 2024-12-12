/* eslint-disable no-undef */
import Logger from 'node-logger-cli';
import {
    mkdir,
    writeFile,
    readFile
} from 'fs/promises';
import path from 'path';
import {
    capitalize,
    getPath,
    sanitize,
    wait
} from './utils/helpers.js';

const log = new Logger.default("ComponentManager", false);

// * Constants
const component_template_regex = /COMPONENT_NAME/g;
const filemaker_types = ["section", "component", "context", "hook"];
const tempaltes_path = "scripts/templates";
const project_path = "src";

/**
 * Object containing paths to template files and their corresponding distribution paths.
 * @constant
 * @type {Object.<string, {template: string, dist: string, suffix?: string, prefix?: string, css?: boolean}>}
 */
const templates = {
    section: {
        template: getPath(tempaltes_path, "section.tsx"),
        dist: getPath(project_path, "app/sections"),
        css: true,
    },
    component: {
        template: getPath(tempaltes_path, "component.tsx"),
        dist: getPath(project_path, "components"),
        css: true,
    },
    context: {
        template: getPath(tempaltes_path, "context.tsx"),
        dist: getPath(project_path, "context"),
        suffix: "Context",
        css: true,
    },
    hook: {
        template: getPath(tempaltes_path, "hook.tsx"),
        dist: getPath(project_path, "hooks"),
        prefix: "use",
        css: false,
    }
}

// * Functions
/**
 * 
 * @param {"section" | "context" | "component"} type 
 * @param {string} name 
 */
async function generate(type, name) {
    try {
        const {
            template,
            dist,
            prefix,
            suffix,
            css
        } = templates[type];
        const capitalizedName = `${prefix ?? ""}${capitalize(name)}${suffix ?? ""}`;
        const generated_path = getPath(dist, capitalizedName);
        const template_content = await readFile(template, {
            encoding: "utf-8"
        });
        const template_adapted = template_content.replace(component_template_regex, capitalizedName);

        await mkdir(generated_path);
        await writeFile(path.join(generated_path, 'index.tsx'), template_adapted);
        if (css) await writeFile(path.join(generated_path, 'style.css'), "");
        await wait();

        log.i(`${capitalize(type)} '${capitalizedName}' created at '${generated_path}'!`)
    } catch (err) {
        log.e(`Something went wrong when creating ${type} ${capitalize(name)}`);
        throw new Error(err);
    }
}

async function create(type, name) {
    try {
        if (type.length < 4 || name.length < 2) throw new Error(`Invalida values for type and name -> (${type} | ${name})`);

        const sanitizedType = sanitize(type).toLocaleLowerCase();
        const sanitizedName = sanitize(name);

        if (!filemaker_types.includes(sanitizedType)) throw new Error(`SanisanitizedType '${type}' creation not implemented`);

        log.l(`Creating ${type} '${capitalize(name)}'...`);

        await wait(1000)
        await generate(sanitizedType, sanitizedName);

    } catch (err) {
        log.e("Something went wrong when running 'create' script", err);
        throw new Error(err);
    }
}

/**
 * 
 * @param {any[]} argv 
 */
async function main(argv) {

    switch (argv[0]) {
        case "create":
            if (argv.length < 3) throw new Error("Params missing (name | type)");
            await create(argv[1], argv[2]);
            break;
        default:
            log.e(`Operation '${argv[0]}' not implemented`);
            break;
    }
}

const argv = process.argv.slice(2);
main(argv);