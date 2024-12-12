
## Before start development

### Create database

The database must have the following structure (Check [database.types.ts](https://github.com/FragnaroK/portfolio_client/blob/main/src/types/database.types.ts) for additional info):

    KEY (0, 1, 2 or 3)
    ├── info
    │   ├── personal
    │   │   ├── name
    │   │   │   ├── first
    │   │   │   ├── second
    │   │   │   ├── last
    │   │   │   └── full
    │   │   ├── jobTitle
    │   │   ├── rights
    │   │   ├── contact
    │   │   │   ├── location
    │   │   │   ├── phone
    │   │   │   └── email
    │   │   ├── languages
    │   │   └── profile
    │   └── professional
    │       ├── experience
    │       │   ├── years
    │       │   └── months
    │       ├── workExperience
    │       │   ├── company
    │       │   ├── location
    │       │   ├── startDate
    │       │   ├── endDate
    │       │   ├── position
    │       │   ├── responsibilities
    │       │   ├── achievements
    │       │   └── ref
    │       │       ├── type
    │       │       ├── link
    │       │       └── label
    │       ├── education
    │       │   ├── degree
    │       │   ├── institution
    │       │   ├── location
    │       │   ├── startDate
    │       │   ├── endDate
    │       │   └── ref (optional)
    │       │       ├── type
    │       │       ├── link
    │       │       └── label
    │       ├── skills
    │       │   ├── skill
    │       │   └── notes
    │       ├── interests
    │       ├── links
    │       │   ├── portfolio
    │       │   ├── github
    │       │   ├── codepen
    │       │   └── linkedin
    │       └── references
    │           ├── name
    │           ├── position
    │           ├── email
    │           └── phone
    ├── meta
    │   ├── version
    │   ├── publish_date
    │   ├── repo
    │   ├── db_iteration
    │   └── latest_resume
    │       ├── date
    │       ├── job
    │       ├── filename
    │       ├── filetype
    │       ├── full_filename
    │       └── ref
    ├── projects
    │   ├── content
    │   ├── id
    │   ├── image
    │   ├── languages
    │   ├── link
    │   ├── repo
    │   └── title
    └── stats
        ├── visits
        ├── rank
        │   └── topProjects
        │       ├── project
        │       ├── clicks
        │       └── projectId
        └── clicks
            ├── resumeDownloads
            └── rankedProjects
                ├── project
                ├── clicks
                └── projectId


### Create `env.json`

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

