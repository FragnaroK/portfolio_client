
export interface IconDefinition {
	className: string;
	unicode: string;
	name: string;
}

export const IconMeta: { [key: string]: IconDefinition } = {
    // Brand Icons
    faHtml5: { className: "fa-brands fa-html5", unicode: "f13b", name: "HTML5" },
    faCss3: { className: "fa-brands fa-css3", unicode: "f13c", name: "CSS3" },
    faReact: { className: "fa-brands fa-react", unicode: "f41b", name: "React" },
    faGoogle: { className: "fa-brands fa-google", unicode: "f1a0", name: "Google" },
    faNodeJs: { className: "fa-brands fa-node-js", unicode: "f3d3", name: "Node.js" },
    faJs: { className: "fa-brands fa-js", unicode: "f3b8", name: "JavaScript" },
    faLinux: { className: "fa-brands fa-linux", unicode: "f17c", name: "Linux" },
    faWindows: { className: "fa-brands fa-windows", unicode: "f17a", name: "Windows" },
    faSass: { className: "fa-brands fa-sass", unicode: "f41e", name: "Sass" },
    faLess: { className: "fa-brands fa-less", unicode: "f41d", name: "Less" },
    faGithub: { className: "fa-brands fa-github", unicode: "f09b", name: "GitHub" },
    faSourcetree: { className: "fa-brands fa-sourcetree", unicode: "f7d3", name: "SourceTree" },
    faBitbucket: { className: "fa-brands fa-bitbucket", unicode: "f171", name: "Bitbucket" },
    faJira: { className: "fa-brands fa-jira", unicode: "f7b1", name: "Jira" },
    faConfluence: { className: "fa-brands fa-confluence", unicode: "f78d", name: "Confluence" },
    faGit: { className: "fa-brands fa-git", unicode: "f1d3", name: "Git" },
    faChrome: { className: "fa-brands fa-chrome", unicode: "f268", name: "Chrome" },
    faDocker: { className: "fa-brands fa-docker", unicode: "f395", name: "Docker" },
    faMarkdown: { className: "fa-brands fa-markdown", unicode: "f60f", name: "Markdown" },
    faBootstrap: { className: "fa-brands fa-bootstrap", unicode: "f836", name: "Bootstrap" },
    faLinkedIn: { className: "fa-brands fa-linkedin", unicode: "f08c", name: "LinkedIn" },
    faCodepen: { className: "fa-brands fa-codepen", unicode: "f1cb", name: "CodePen" },
    
    // Solid Icons
	faCheck: { className: "fa-solid fa-check", unicode: "f00c", name: "Check" },
	faCancel: { className: "fa-solid fa-xmark", unicode: "f00d", name: "Cancel" },
	faFile: { className: "fa-solid fa-file", unicode: "f15b", name: "File" },
	faFilePdf: { className: "fa-solid fa-file-pdf", unicode: "f1c1", name: "File PDF" },
	faFileWord: { className: "fa-solid fa-file-word", unicode: "f1c2", name: "File Word" },
    faArrowUpRightFromSquare: { className: "fa-solid fa-arrow-up-right-from-square", unicode: "f08e", name: "Arrow Up Right From Square" },
    faCertificate: { className: "fa-solid fa-certificate", unicode: "f0a3", name: "Certificate" },
    faEye: { className: "fa-solid fa-eye", unicode: "f06e", name: "Eye" },
    faEyeSlash: { className: "fa-solid fa-eye-slash", unicode: "f070", name: "Eye Slash" },
    faNewspaper: { className: "fa-solid fa-newspaper", unicode: "f1ea", name: "Newspaper" },
    faSmile: { className: "fa-solid fa-smile", unicode: "f118", name: "Smile" },
	faEnvelope: { className: "fa-solid fa-envelope", unicode: "f0e0", name: "Envelope" },
	faLink: { className: "fa-solid fa-link", unicode: "f0c1", name: "Link" },
	faCircle: { className: "fa-solid fa-circle", unicode: "f111", name: "Circle" },
	faDownload: { className: "fa-solid fa-download", unicode: "f019", name: "Download" },
	faAnchor: { className: "fa-solid fa-anchor", unicode: "f13d", name: "Anchor" },
	faGift: { className: "fa-solid fa-gift", unicode: "f06b", name: "Gift" },

} as const; 

export const TechIcons: { [key: string]: { color: string; icon: IconDefinition; name: string } } = {
    HTML5: {
		color: "#E44D26", // HTML5 color
		icon: IconMeta.faHtml5,
		name: "HTML5"
	},
	CSS3: {
		color: "#264DE4", // CSS3 color
		icon: IconMeta.faCss3,
		name: "CSS3"
	},
	React: {
		color: "#61DAFB", // React color
		icon: IconMeta.faReact,
		name: "React"
	},
	Google: {
		color: "#4285F4", // Google color
		icon: IconMeta.faGoogle,
		name: "Google"
	},
	NodeJs: {
		color: "#68A063", // Node.js color
		icon: IconMeta.faNodeJs,
		name: "Node.js"
	},
	JavaScript: {
		color: "#F0DB4F", // JavaScript color
		icon: IconMeta.faJs,
		name: "JavaScript"
	},
	Linux: {
		color: "#FCC624", // Linux color
		icon: IconMeta.faLinux,
		name: "Linux"
	},
	Windows: {
		color: "#0078D7", // Windows color
		icon: IconMeta.faWindows,
		name: "Windows"
	},
	SASS: {
		color: "#CC6699", // Sass color
		icon: IconMeta.faSass,
		name: "Sass"
	},
	LESS: {
		color: "#1D365D", // Less color
		icon: IconMeta.faLess,
		name: "Less"
	},
	GitHub: {
		color: "#4078C0", // GitHub color
		icon: IconMeta.faGithub,
		name: "GitHub"
	},
	SourceTree: {
		color: "#0052CC", // SourceTree color
		icon: IconMeta.faSourcetree,
		name: "SourceTree"
	},
	Bitbucket: {
		color: "#205081", // Bitbucket color
		icon: IconMeta.faBitbucket,
		name: "Bitbucket"
	},
	Jira: {
		color: "#0052CC", // Jira color
		icon: IconMeta.faJira,
		name: "Jira"
	},
	Confluence: {
		color: "#172B4D", // Confluence color
		icon: IconMeta.faConfluence,
		name: "Confluence"
	},
	Git: {
		color: "#F05032", // Git color
		icon: IconMeta.faGit,
		name: "Git"
	},
	Chrome: {
		color: "#4285F4", // Chrome color
		icon: IconMeta.faChrome,
		name: "Chrome"
	},
	Docker: {
		color: "#2496ED", // Docker color
		icon: IconMeta.faDocker,
		name: "Docker"
	},
	Markdown: {
		color: "#083A7D", // Markdown color
		icon: IconMeta.faMarkdown,
		name: "Markdown"
	},
	Bootstrap: {
		color: "#563D7C", // Bootstrap color
		icon: IconMeta.faBootstrap,
		name: "Bootstrap"
	}
} as const;

