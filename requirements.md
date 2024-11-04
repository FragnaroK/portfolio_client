
## Before start development

Add the following env variables into an `env.json` file (structure below):
 
 - Add `DB_ENDPOINT` to `env.json` file
 - Add `DV_CONFIG` to `env.json` file
 - Add `DB_VERSION` to `env.json` file

        {
            "DB_ENDPOINT": {
                "encode": false,
                "value": 3 // 3: DEV | 0: PROD
            },
            "DB_VERSION": {
                "encode": false,
                "value": "v3" // DB version
	        },
            "DV_CONFIG": {
                "encode": true,
                "value": "some db config values/object"
            }
        }


## Generate `VITE_DV_CONFIG`

Copy/paste your firebase config into the env.json file then run:

    pnpm gen::config

    or

    npm run gen::config

