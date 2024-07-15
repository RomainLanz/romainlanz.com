export const ArticleStatus = {
  Draft: 1,
  InReview: 2,
  Unlisted: 3,
  Private: 4,
  Public: 5,
  Archived: 6,
  Declined: 7,
  InProgress: 8,
} as const

export const ArticleStatusText = {
  [ArticleStatus.Draft]: 'Draft',
  [ArticleStatus.InReview]: 'In Review',
  [ArticleStatus.Unlisted]: 'Unlisted',
  [ArticleStatus.Private]: 'Private',
  [ArticleStatus.Public]: 'Public',
  [ArticleStatus.Archived]: 'Archived',
  [ArticleStatus.Declined]: 'Declined',
  [ArticleStatus.InProgress]: 'In Progress',
} as const
