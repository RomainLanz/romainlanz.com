export const NewsletterSubscriptionStatus = {
  Pending: 0,
  Confirmed: 1,
} as const

export type NewsletterSubscriptionStatus =
  (typeof NewsletterSubscriptionStatus)[keyof typeof NewsletterSubscriptionStatus]
