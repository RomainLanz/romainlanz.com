import { db } from '#core/services/db'

interface StorePostDTO {
  title: string
  slug: string
  markdownContent: string
  htmlContent: string
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
        html_content: payload.htmlContent,
        markdown_content: payload.markdownContent,
        canonical_url: payload.canonicalUrl,
      })
      .execute()
  }

  findBySlug(slug: string) {
    return db
      .selectFrom('posts')
      .select(['id', 'title', 'slug', 'html_content', 'created_at'])
      .where('slug', '=', slug)
      .executeTakeFirst()
  }
}
