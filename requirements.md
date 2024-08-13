
## Before start development

Add the following env variables into an `env.json` file (structure below):
 
 - Add `VITE_DB_ENDPOINT` to `env.json` file
 - Add `VITE_DV_CONFIG` to `env.json` file

        {
            "DB_ENDPOINT": {
                "encode": false,
                "value": 3
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

