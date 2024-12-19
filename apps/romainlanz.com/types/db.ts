/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Articles {
  category_id: string;
  content_html: string;
  content_markdown: string;
  created_at: Timestamp;
  id: string;
  published_at: Timestamp | null;
  reading_time: Generated<number>;
  slug: string;
  status: Generated<number>;
  summary: string;
  title: string;
  updated_at: Timestamp | null;
}

export interface Categories {
  id: string;
  illustration_name: string;
  name: string;
  slug: string;
}

export interface Newsletters {
  created_at: Timestamp;
  email: string;
  id: string;
  subscription_status: Generated<number>;
  unsubscribe_token: string;
}

export interface Pastes {
  content: string;
  created_at: Timestamp;
  id: string;
  user_id: string | null;
}

export interface Redirects {
  created_at: Timestamp;
  destination: string;
  id: string;
  slug: string;
  updated_at: Timestamp | null;
}

export interface RedirectVisits {
  count: Generated<number>;
  created_at: Timestamp;
  id: string;
  redirect_id: string;
  referer: string | null;
  unique_hash: string;
}

export interface TagArticles {
  article_id: string;
  tag_id: string;
}

export interface Tags {
  color: string;
  id: string;
  name: string;
}

export interface Users {
  avatar_url: string | null;
  created_at: Timestamp;
  email: string;
  id: string;
  name: string;
  password: string;
  role: Generated<number>;
  updated_at: Timestamp | null;
}

export interface DB {
  articles: Articles;
  categories: Categories;
  newsletters: Newsletters;
  pastes: Pastes;
  redirect_visits: RedirectVisits;
  redirects: Redirects;
  tag_articles: TagArticles;
  tags: Tags;
  users: Users;
}
