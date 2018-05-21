import { SafeHtml } from '@angular/platform-browser';

export interface Post {
  title: string;
  permalink: string;
  tags: string[];
  source: string;
  rendered?: SafeHtml;
  author: string;
  created: Date;
}

export interface User {
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
}

export interface Login {
  email: string;
  password: string;
}

export interface LoginToken {
  token: string;
  name?: string;
  email?: string;
}
