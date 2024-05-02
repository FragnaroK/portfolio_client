export interface DatabaseSnap {
    info:     Info;
    meta:     Meta;
    projects: Project[];
    stats:    Stats;
}

export interface Info {
    personal:     Personal;
    professional: Professional;
}

export interface Personal {
    name:      Name;
    jobTitle:  string[];
    rights:    string;
    contact:   Contact;
    languages: string[];
    profile:   string;
}

export interface Contact {
    location: string;
    phone:    string;
    email:    string;
}

export interface Name {
    first:  string;
    second?: string;
    last?:   string;
    full:   string;
}

export interface Professional {
    experience:     Experience;
    workExperience: WorkExperience[];
    education:      Education[];
    skills?:         Skill[];
    interests?:      string[];
    links:          Links;
    references:     Reference[];
}

export interface Education {
    degree?:      string;
    institution?: string;
    location?:    string;
    startDate?:   string;
    endDate?:     string;
}

export interface Experience {
    years?:  number;
    months?: number;
}

export interface Links {
    portfolio?: string;
    github?:    string;
    codepen?:   string;
    linkedin?:  string;
}

export interface Reference {
    name?:     string;
    position?: string;
    email?:    string;
    phone?:    string;
}

export interface Skill {
    skill?: string;
    notes?: string;
}

export interface WorkExperience {
    company?:          string;
    location?:         string;
    startDate?:        string;
    endDate?:          string;
    position?:         string;
    responsibilities?: string[];
    achievements?:     string[];
}

export interface Meta {
    version?:     string;
    publishDate?: string;
    repo?:        string;
    lastResume?:  LastResume;
}

export interface LastResume {
    date?:     string;
    job?:      string;
    filename?: string;
    filetype?: string;
}

export interface Project {
    project:     string;
    tech:        string[];
    timestamp?:   string;
    description: string;
    image:       string;
    repo:        string;
    link:        string;
    id:          string;
}

export interface Stats {
    visits: number;
    rank:   Rank;
    clicks: Clicks;
}

export interface Clicks {
    resumeDownloads: number;
    rankedProjects:  RankedProjectElement[];
}

export interface RankedProjectElement {
    project:   string;
    clicks:    string;
    projectID: string;
}

export interface Rank {
    topProjects: RankedProjectElement[];
}
