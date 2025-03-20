import {
    stat,
    readFile,
    writeFile
} from 'fs'
 
const pathToFileOrDir = `./env.json`;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function envExist() {
    // Check if the file or directory exists asynchronously
    stat(pathToFileOrDir, (err) => {
        if (err) {
            console.log(`The file or directory at '${pathToFileOrDir}' not found.`);
            throw new Error(err)
        } else {
            console.log(`The file or directory at '${pathToFileOrDir}' found.`);
        }
    });
}

function encode(d) {
    const sEnv = JSON.stringify(d);
    const iterations = getRandomInt(1, 10);
    let encoded= sEnv;

    for (let i = 0; i < iterations; i++) {
        // not an actual way to secure something but I guess I 
        // like to add extra non-sense complexity to the code sometimes
        encoded = btoa(encoded);
    }

    return `${iterations}${encoded}`;
}

function parseEnv(onFinish = () => {}) {
    readFile(pathToFileOrDir, 'utf8', function (err, data) {
        if (err) throw new Error(err);
        const parsedEnv = []
        const env = JSON.parse(data);
        Object.keys(env).forEach((k) => {
            const kValue = env[k].encode ? encode(env[k].value) : env[k].value;
            parsedEnv.push([k, kValue]);
        })
        onFinish(parsedEnv);
    });
}

function generateEnv(envValues = []) {
    const envFileContent = envValues.map((value) => `VITE_${value[0].toUpperCase()}="${value[1]}"`)
    writeFile(`./.env`, envFileContent.join('\n'), { encoding: 'utf8' }, (err) => {
        if (err) throw new Error(err)
        console.log(".env file generated");
    })
}


function main() {
    try {
        envExist()
        parseEnv((parsedEnv) => {
            generateEnv(parsedEnv)
        })
    } catch (err) {
        throw new Error(err)
    }
}

main();


// Template

/*
{
	"DB_ENDPOINT": {
        "encode": false,
        "value": 1
    },
	"DV_CONFIG": {
		"encode": true,
		"value": {
			"apiKey": "key",
			"authDomain": "dom",
			"databaseURL": "db",
			"projectId": "p",
			"storageBucket": "storage,
			"messagingSenderId": "id",
			"appId": "id",
			"measurementId": "id"
		}
	}
}
*/