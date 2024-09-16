export interface DatabaseSnap {
    readonly info:     Info;
    readonly meta:     Meta;
    readonly projects: Project[];
    readonly stats:    Stats;
}

export interface Info {
    readonly personal:     Personal;
    readonly professional: Professional;
}

export interface Personal {
    readonly name:      Name;
    readonly jobTitle:  string[];
    readonly rights:    string;
    readonly contact:   Contact;
    readonly languages: string[];
    readonly profile:   string;
}

export interface Contact {
    readonly location: string;
    readonly phone:    string;
    readonly email:    string;
}

export interface Name {
    readonly first:  string;
    readonly second: string;
    readonly last:   string;
    readonly full:   string;
}

export interface Professional {
    readonly experience:     Experience;
    readonly workExperience: WorkExperience[];
    readonly education:      Education[];
    readonly skills:         Skill[];
    readonly interests:      string[];
    readonly links:          Links;
    readonly references:     Reference[];
}

export interface Education {
    readonly degree:      string;
    readonly institution: string;
    readonly location:    string;
    readonly startDate:   string;
    readonly endDate:     string;
    readonly ref?:        Ref;
}

export interface Ref {
    readonly type:  string;
    readonly link:  string;
    readonly label: string;
}

export interface Experience {
    readonly years:  number;
    readonly months: number;
}

export interface Links {
    readonly portfolio: string;
    readonly github:    string;
    readonly codepen:   string;
    readonly linkedin:  string;
}

export interface Reference {
    readonly name:     string;
    readonly position: string;
    readonly email:    string;
    readonly phone:    string;
}

export interface Skill {
    readonly skill: string;
    readonly notes: string;
}

export interface WorkExperience {
    readonly company:          string;
    readonly location:         string;
    readonly startDate:        string;
    readonly endDate:          string;
    readonly position:         string;
    readonly responsibilities: string[];
    readonly achievements:     string[];
    readonly ref?: Ref;
}

export interface Meta {
    readonly version:       string;
    readonly publish_date:  string;
    readonly repo:          string;
    readonly db_iteration:  string;
    readonly latest_resume: LatestResume;
}

export interface LatestResume {
    readonly date:          string;
    readonly job:           string;
    readonly filename:      string;
    readonly filetype:      string;
    readonly full_filename: string;
    readonly ref:           string;
}

export interface Project {
    readonly content:   string;
    readonly id:        string;
    readonly image:     string;
    readonly languages: string[];
    readonly link:      string;
    readonly repo:      string;
    readonly title:     string;
}

export interface Stats {
    readonly visits: number;
    readonly rank:   Rank;
    readonly clicks: Clicks;
}

export interface Clicks {
    readonly resumeDownloads: number;
    readonly rankedProjects:  RankedProjectElement[];
}

export interface RankedProjectElement {
    readonly project:   string;
    readonly clicks:    string;
    readonly projectId: string;
}

export interface Rank {
    readonly topProjects: RankedProjectElement[];
}
