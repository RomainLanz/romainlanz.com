import { db } from '#core/services/db'

interface StorePostDTO {
  title: string
  slug: string
  content: string
  canonicalUrl: string
}

export class PostRepository {
  all() {
    return db
      .selectFrom('posts')
      .select(['posts.id', 'posts.title', 'posts.slug', 'posts.created_at'])
      .execute()
  }

  create(payload: StorePostDTO) {
    return db
      .insertInto('posts')
      .values({
        created_at: new Date(),
        updated_at: new Date(),
        title: payload.title,
        slug: payload.slug,
        content: payload.content,
        canonical_url: payload.canonicalUrl,
      })
      .execute()
  }
}
