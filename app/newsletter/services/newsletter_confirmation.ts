import { NewsletterRepository } from '#newsletter/repositories/newsletter_repository'

export class NewsletterConfirmation {
  constructor(private readonly newsletterRepository: NewsletterRepository) {}

  async execute(subscriptionId: string) {
    const subscription = await this.newsletterRepository.findById(subscriptionId)

    await this.newsletterRepository.confirmSubscription(subscriptionId)
  }
}
