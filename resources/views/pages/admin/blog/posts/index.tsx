import { Table } from '#views/components/table/table'
import { Admin } from '#views/layouts/admin'

interface IndexProps {
  posts: any
}

export function Index(props: IndexProps) {
  return (
    <Admin title="Articles">
      <Table headers={['Titre', 'Actions']}>
        {props.posts.map((post: any) => (
          <tr>
            <td>{post.title}</td>
            <td>
              <a href={`/admin/blog/posts/${post.id}/edit`}>Modifier</a>
            </td>
          </tr>
        ))}
      </Table>
    </Admin>
  )
}
