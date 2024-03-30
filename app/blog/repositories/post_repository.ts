import { db } from '#core/services/db'
import { ResultOf } from '#types/common'

interface StorePostDTO {
  title: string
  slug: string
  markdownContent: string
  htmlContent: string
  canonicalUrl: string
}

interface UpdatePostDTO {
  id: string
  title: string
  markdownContent: string
  htmlContent: string
  canonicalUrl: string
}

export type PostListQueryResult = ResultOf<PostRepository, 'all'>
export type PostQueryResult = ResultOf<PostRepository, 'findBySlug'>
export type PostByIdQueryResult = ResultOf<PostRepository, 'findById'>

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

  update(payload: UpdatePostDTO) {
    return db
      .updateTable('posts')
      .set({
        title: payload.title,
        html_content: payload.htmlContent,
        markdown_content: payload.markdownContent,
        canonical_url: payload.canonicalUrl,
      })
      .where('id', '=', payload.id)
      .execute()
  }

  findById(id: string) {
    return db.selectFrom('posts').selectAll().where('id', '=', id).executeTakeFirst()
  }

  findBySlug(slug: string) {
    return db
      .selectFrom('posts')
      .select(['id', 'title', 'slug', 'html_content', 'created_at'])
      .where('slug', '=', slug)
      .executeTakeFirst()
  }
}
