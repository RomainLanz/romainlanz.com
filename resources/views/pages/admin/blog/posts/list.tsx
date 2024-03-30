import { Table } from '#views/components/table/table'
import { Admin } from '#views/layouts/admin'
import { route, space } from '#start/view'
import { Button } from '#views/components/button'
import type { PostListQueryResult } from '#blog/repositories/post_repository'

interface IndexProps {
  posts: PostListQueryResult
}

export function List(props: IndexProps) {
  return (
    <Admin title="Articles">
      <div class="d-flex column" style={{ gap: space(5) }}>
        <div>
          <Button href={route('admin.blog.posts.create')}>Ajouter</Button>
        </div>

        <Table headers={['Titre', 'Actions']}>
          {props.posts.map((post) => (
            <tr>
              <td>
                <a href={route('blog.posts.show', [post.slug])}>{post.title}</a>
              </td>
              <td>
                <a href={route('admin.blog.posts.edit', [post.id])}>Modifier</a>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </Admin>
  )
}
