
## Requirements

### Setting Up the Environment

1. **Setup Firebase:** Follow the instructions of the firebase docs to setup your firebase project: [Firebase Documentation](https://firebase.google.com/docs/web/setup?hl=es-419)

2. **Create the Database:** The database should follow the structure defined in [database.types.ts](https://github.com/FragnaroK/portfolio_client/blob/main/src/types/database.types.ts) or refer to the tree at the bottom of this page.

3. **Create `env.json`:** Add the following environment variables to an env.json file.

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

### Generating Configuration

Copy your firebase config into the env.json file and run:

    pnpm run gen::config
    # or
    npm run gen::config

### Running the Project

To start the development server:

    pnpm run dev
    # or 
    npm run dev

### Database Structure

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
        └── stats (not being used just yet)
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

### Folder Structure

Here is a brief overview of the project's structure:

    .
    ├── env.json
    ├── firebase.json
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── pnpm-lock.yaml
    ├── public
    │   └── favicon
    │       ├── ios
    │       │   ├── icons8-dev-ios-17-outlined-57.png
    │       │   ├── icons8-dev-ios-17-outlined-60.png
    │       │   ├── icons8-dev-ios-17-outlined-72.png
    │       │   └── icons8-dev-ios-17-outlined-76.png
    │       ├── web
    │       │   ├── icons8-dev-ios-17-outlined-16.png
    │       │   ├── icons8-dev-ios-17-outlined-32.png
    │       │   └── icons8-dev-ios-17-outlined-96.png
    │       └── windows
    │           └── icons8-dev-ios-17-outlined-70.png
    ├── README.md
    ├── requirements.md
    ├── scripts
    │   ├── component.gen.js
    │   ├── config.gen.js
    │   ├── templates
    │   │   ├── component.tsx
    │   │   ├── context.tsx
    │   │   ├── hook.tsx
    │   │   └── section.tsx
    │   ├── theme.gen.js
    │   └── utils
    │       └── helpers.js
    ├── src
    │   ├── app
    │   │   ├── index.tsx
    │   │   ├── layout
    │   │   │   ├── BottomBar
    │   │   │   │   └── index.tsx
    │   │   │   └── Content
    │   │   │       └── index.tsx
    │   │   ├── Provider.tsx
    │   │   ├── sections
    │   │   │   ├── AboutMe
    │   │   │   │   ├── index.tsx
    │   │   │   │   └── style.css
    │   │   │   ├── Experience
    │   │   │   │   ├── index.tsx
    │   │   │   │   └── style.css
    │   │   │   ├── Footer
    │   │   │   │   ├── index.tsx
    │   │   │   │   └── style.css
    │   │   │   ├── Introduction
    │   │   │   │   ├── index.tsx
    │   │   │   │   └── style.css
    │   │   │   └── Projects
    │   │   │       ├── index.tsx
    │   │   │       └── style.css
    │   │   └── style.css
    │   ├── assets
    │   │   ├── fonts
    │   │   │   └── Lato
    │   │   │       ├── Lato-BlackItalic.ttf
    │   │   │       ├── Lato-Black.ttf
    │   │   │       ├── Lato-BoldItalic.ttf
    │   │   │       ├── Lato-Bold.ttf
    │   │   │       ├── Lato-Italic.ttf
    │   │   │       ├── Lato-LightItalic.ttf
    │   │   │       ├── Lato-Light.ttf
    │   │   │       ├── Lato-Regular.ttf
    │   │   │       ├── Lato-ThinItalic.ttf
    │   │   │       ├── Lato-Thin.ttf
    │   │   │       └── OFL.txt
    │   │   └── images
    │   │       └── ProfilePicture.svg
    │   ├── components
    │   │   ├── AnimatedStack.tsx
    │   │   ├── common
    │   │   │   ├── Accordion.tsx
    │   │   │   ├── Button
    │   │   │   │   ├── index.tsx
    │   │   │   │   └── variants
    │   │   │   │       ├── button.tag.tsx
    │   │   │   │       └── link.tag.tsx
    │   │   │   ├── Card.tsx
    │   │   │   ├── Chips.tsx
    │   │   │   ├── Email.tsx
    │   │   │   ├── Flex.tsx
    │   │   │   ├── IconButton.tsx
    │   │   │   ├── Icon.tsx
    │   │   │   ├── Image.tsx
    │   │   │   ├── PopUp.tsx
    │   │   │   ├── Spinner.tsx
    │   │   │   ├── Text.tsx
    │   │   │   ├── Title.tsx
    │   │   │   └── Toggle.tsx
    │   │   ├── index.ts
    │   │   ├── ProfilePhoto.tsx
    │   │   └── ProjectContainer.tsx
    │   ├── config
    │   │   ├── firebase.config.ts
    │   │   └── window.config.ts
    │   ├── constants
    │   │   ├── const.css
    │   │   └── const.ts
    │   ├── context
    │   │   ├── Firebase
    │   │   │   ├── hooks.ts
    │   │   │   ├── index.tsx
    │   │   │   └── style.css
    │   │   ├── Notification
    │   │   │   ├── hooks.ts
    │   │   │   ├── index.tsx
    │   │   │   └── style.css
    │   │   ├── PopUp
    │   │   │   ├── hooks.ts
    │   │   │   ├── index.tsx
    │   │   │   └── style.css
    │   │   └── Utils
    │   │       ├── hooks.ts
    │   │       ├── index.tsx
    │   │       └── style.css
    │   ├── hooks
    │   │   ├── useDownloadFirebaseFile.ts
    │   │   └── useMarkdown.ts
    │   ├── main.tsx
    │   ├── styles
    │   │   ├── components
    │   │   │   ├── AnimatedStack.css
    │   │   │   ├── common
    │   │   │   │   ├── Accordion.css
    │   │   │   │   ├── Button.css
    │   │   │   │   ├── Card.css
    │   │   │   │   ├── Chips.css
    │   │   │   │   ├── Email.css
    │   │   │   │   ├── Flex.css
    │   │   │   │   ├── IconButton.css
    │   │   │   │   ├── Icon.css
    │   │   │   │   ├── Image.css
    │   │   │   │   ├── PopUp.css
    │   │   │   │   ├── Spinner.css
    │   │   │   │   ├── Text.css
    │   │   │   │   ├── Title.css
    │   │   │   │   └── Toggle.css
    │   │   │   ├── ProfilePhoto.css
    │   │   │   └── ProjectContainer.css
    │   │   ├── global.css
    │   │   └── theme.css
    │   ├── types
    │   │   ├── database.types.ts
    │   │   └── index.ts
    │   ├── utils
    │   │   └── helpers.ts
    │   └── vite-env.d.ts
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts


