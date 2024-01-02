export enum skillType {
  SKILL = 'skill',
  JOB = 'job',
  PROFILE = 'profile',
  ARTICLE = 'article',
}

interface base {
  id: string;
  type: skillType;
  createdAt: string;
  order?: number;
  description?: string;
}

export interface Skill extends base {
  date: string;
  skill_name: string;
  confidence: number;
}

export interface Job extends base {
  start_date: string;
  end_date: string;
  job_title: string;
  company: string;
  company_url: string;
}

export interface Profile extends base {
  profile_image: string;
  linkedIn: string;
  github: string;
  website: string;
  number?: string;
  email?: string;
}

export interface Article extends base {
  url: string;
  publication: string;
  date: string;
}
