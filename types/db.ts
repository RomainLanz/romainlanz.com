import type { ColumnType } from 'kysely'

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>

export type Timestamp = ColumnType<Date, Date | string, Date | string>

export interface Posts {
  canonical_url: string | null
  content: string
  created_at: Timestamp
  description: string | null
  id: Generated<string>
  slug: string
  status: Generated<number>
  title: string
  updated_at: Timestamp
}

export interface Redirects {
  created_at: Timestamp
  id: Generated<string>
  to: string
  updated_at: Timestamp
  url: string
}

export interface Users {
  created_at: Timestamp
  email: string
  id: Generated<string>
  password: string
  role: Generated<number | null>
  updated_at: Timestamp
}

export interface DB {
  posts: Posts
  redirects: Redirects
  users: Users
}
