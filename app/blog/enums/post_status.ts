export const PostStatus = {
  Draft: 1,
  InReview: 2,
  Unlisted: 3,
  Private: 4,
  Public: 5,
  Archived: 6,
  Declined: 7,
  InProgress: 8,
} as const

export type IPostStatus = (typeof PostStatus)[keyof typeof PostStatus]

export const PostStatusText = {
  [PostStatus.Draft]: 'Draft',
  [PostStatus.InReview]: 'In Review',
  [PostStatus.Unlisted]: 'Unlisted',
  [PostStatus.Private]: 'Private',
  [PostStatus.Public]: 'Public',
  [PostStatus.Archived]: 'Archived',
  [PostStatus.Declined]: 'Declined',
  [PostStatus.InProgress]: 'In Progress',
} as const
