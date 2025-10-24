
export interface Project {
  id?: string | number;
  title?: string;
  content?: string;
  thumbnail?: string;
  githubLink?: string;
  liveLink?: string;
  tags?: string[];
}
export interface Blog {
  id?: number;
  title?: string;
  content?: string;
  authorId?: number;
  thumbnail?: string;
}
