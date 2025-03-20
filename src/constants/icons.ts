import { faHtml5, faCss3, faReact, faGoogle, faNodeJs, faJs, faLinux, faWindows, faSass, faLess, faGithub, faSourcetree, faBitbucket, faJira, faConfluence, faGit, faChrome, faDocker, faMarkdown, faBootstrap, IconDefinition } from "@fortawesome/free-brands-svg-icons";

const Icons: { [key: string]: { color: string; icon: IconDefinition } } = {
    HTML5: {
		color: "#E44D26", // HTML5 color
		icon: faHtml5,
	},
	CSS3: {
		color: "#264DE4", // CSS3 color
		icon: faCss3,
	},
	React: {
		color: "#61DAFB", // React color
		icon: faReact,
	},
	Google: {
		color: "#4285F4", // Google color
		icon: faGoogle,
	},
	NodeJs: {
		color: "#68A063", // Node.js color
		icon: faNodeJs,
	},
	JavaScript: {
		color: "#F0DB4F", // JavaScript color
		icon: faJs,
	},
	Linux: {
		color: "#FCC624", // Linux color
		icon: faLinux,
	},
	Windows: {
		color: "#0078D7", // Windows color
		icon: faWindows,
	},
	SASS: {
		color: "#CC6699", // Sass color
		icon: faSass,
	},
	LESS: {
		color: "#1D365D", // Less color
		icon: faLess,
	},
	GitHub: {
		color: "#4078C0", // GitHub color
		icon: faGithub,
	},
	SourceTree: {
		color: "#0052CC", // SourceTree color
		icon: faSourcetree,
	},
	Bitbucket: {
		color: "#205081", // Bitbucket color
		icon: faBitbucket,
	},
	Jira: {
		color: "#0052CC", // Jira color
		icon: faJira,
	},
	Confluence: {
		color: "#172B4D", // Confluence color
		icon: faConfluence,
	},
	Git: {
		color: "#F05032", // Git color
		icon: faGit,
	},
	Chrome: {
		color: "#4285F4", // Chrome color
		icon: faChrome,
	},
	Docker: {
		color: "#2496ED", // Docker color
		icon: faDocker,
	},
	Markdown: {
		color: "#083A7D", // Markdown color
		icon: faMarkdown,
	},
	Bootstrap: {
		color: "#563D7C", // Bootstrap color
		icon: faBootstrap,
	}
} as const;

export default Icons;
