import { db } from '#core/services/db'
import { ResultOf } from '#types/common'

interface StorePostDTO {
  title: string
  description: string
  slug: string
  markdownContent: string
  markdownAst: any
  canonicalUrl: string
}

interface UpdatePostDTO {
  id: string
  description: string
  title: string
  markdownContent: string
  markdownAst: any
  canonicalUrl: string
}

export type PostListQueryResult = ResultOf<PostRepository, 'all'>
export type PostLastFourPublishedQueryResult = ResultOf<PostRepository, 'findLastFourPublished'>
export type PostPaginatedQueryResult = ResultOf<PostRepository, 'paginated'>
export type PostQueryResult = ResultOf<PostRepository, 'findBySlug'>
export type PostByIdQueryResult = ResultOf<PostRepository, 'findById'>

export class PostRepository {
  all() {
    return db
      .selectFrom('posts')
      .select(['posts.id', 'posts.title', 'posts.slug', 'posts.created_at'])
      .execute()
  }

  paginated(page: number, perPage: number) {
    return db
      .selectFrom('posts')
      .select(['title', 'description', 'slug', 'published_at'])
      .orderBy('published_at', 'desc')
      .where('published_at', 'is not', null)
      .where('published_at', '<=', new Date())
      .offset((page - 1) * perPage)
      .limit(perPage)
      .execute()
  }

  findLastFourPublished() {
    return db
      .selectFrom('posts')
      .select(['title', 'description', 'slug', 'published_at'])
      .orderBy('published_at', 'desc')
      .where('published_at', 'is not', null)
      .where('published_at', '<=', new Date())
      .limit(4)
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
        description: payload.description,
        markdown_ast: payload.markdownAst,
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
        description: payload.description,
        markdown_ast: payload.markdownAst,
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
      .select(['id', 'title', 'slug', 'markdown_ast', 'markdown_content', 'created_at'])
      .where('slug', '=', slug)
      .executeTakeFirstOrThrow()
  }
}
