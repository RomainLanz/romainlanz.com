import { db } from '#core/services/db'
import { ResultOf } from '#types/common'

interface StoreArticleDTO {
  title: string
  description: string
  slug: string
  markdownContent: string
  markdownAst: any
  canonicalUrl: string
}

interface UpdateArticleDTO {
  id: string
  description: string
  title: string
  markdownContent: string
  markdownAst: any
  canonicalUrl: string
}

export type ArticleListQueryResult = ResultOf<ArticleRepository, 'all'>
export type ArticlePaginatedQueryResult = ResultOf<ArticleRepository, 'paginated'>
export type ArticleQueryResult = ResultOf<ArticleRepository, 'findBySlug'>
export type ArticleByIdQueryResult = ResultOf<ArticleRepository, 'findById'>

export class ArticleRepository {
  all() {
    return db.selectFrom('articles').select(['id', 'title', 'slug', 'published_at']).execute()
  }

  paginated(page: number, perPage: number) {
    return db
      .selectFrom('articles')
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
      .selectFrom('articles')
      .select(['title', 'description', 'slug', 'published_at'])
      .orderBy('published_at', 'desc')
      .where('published_at', 'is not', null)
      .where('published_at', '<=', new Date())
      .limit(4)
      .execute()
  }

  create(payload: StoreArticleDTO) {
    return db
      .insertInto('articles')
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

  update(payload: UpdateArticleDTO) {
    return db
      .updateTable('articles')
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
    return db.selectFrom('articles').selectAll().where('id', '=', id).executeTakeFirst()
  }

  findBySlug(slug: string) {
    return db
      .selectFrom('articles')
      .select(['id', 'title', 'slug', 'markdown_ast', 'markdown_content', 'created_at'])
      .where('slug', '=', slug)
      .executeTakeFirstOrThrow()
  }
}
