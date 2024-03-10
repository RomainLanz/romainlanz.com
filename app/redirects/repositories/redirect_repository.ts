import { db } from '#core/services/db'
import { sql } from 'kysely'

interface StoreRedirectDTO {
  url: string
  to: string
}

export class RedirectRepository {
  all() {
    return db.selectFrom('redirects').select(['url', 'to', 'visit_count']).execute()
  }

  findByUrl(url: string) {
    return db.selectFrom('redirects').where('url', '=', url).select(['id', 'to']).executeTakeFirst()
  }

  increaseVisitCount(id: string) {
    return db
      .updateTable('redirects')
      .set('visit_count', sql`visit_count + 1`)
      .where('id', '=', id)
      .execute()
  }

  create(payload: StoreRedirectDTO) {
    return db
      .insertInto('redirects')
      .values({
        url: payload.url,
        to: payload.to,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .execute()
  }
}
