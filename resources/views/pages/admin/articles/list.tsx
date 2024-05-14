import { Table } from '#views/components/table/table'
import { Admin } from '#views/layouts/admin'
import { route, space } from '#start/view'
import { Button } from '#views/components/button'
import type { ArticleListQueryResult } from '#articles/repositories/article_repository'

interface IndexProps {
  articles: ArticleListQueryResult
}

export function List(props: IndexProps) {
  const { articles } = props

  return (
    <Admin title="Articles">
      <div class="d-flex column" style={{ gap: space(5) }}>
        <div>
          <Button href={route('admin.articles.create')}>Ajouter</Button>
        </div>

        <Table headers={['Titre', 'Actions']}>
          {articles.map((article) => (
            <tr>
              <td>
                <a href={route('articles.show', [article.slug])}>{article.title}</a>
              </td>
              <td>
                <a href={route('admin.articles.edit', [article.id])}>Modifier</a>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </Admin>
  )
}
