import { Table } from '#views/components/table/table'
import { Admin } from '#views/layouts/admin'

interface IndexProps {
  posts: any
}

export function Index(props: IndexProps) {
  return (
    <Admin title="Articles">
      <Table>
        <>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Canonical URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.posts.map((post: any) => (
              <tr>
                <td>{post.title}</td>
                <td>{post.canonicalUrl}</td>
                <td>
                  <a href={`/admin/blog/posts/${post.id}/edit`}>Modifier</a>
                </td>
              </tr>
            ))}
          </tbody>
        </>
      </Table>
    </Admin>
  )
}
