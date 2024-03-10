import { route, space } from '#start/view'
import { Button } from '#views/components/button'
import { Admin } from '#views/layouts/admin'
import { Table } from '#views/components/table/table'

interface IndexProps {
  redirects: any[]
}

export function Index(props: IndexProps) {
  const { redirects } = props

  return (
    <Admin title="Redirections">
      <div class="d-flex column" style={{ gap: space(5) }}>
        <div>
          <Button href={route('admin.redirects.create')}>Ajouter</Button>
        </div>

        <Table headers={['From', 'To', 'Visits']}>
          {redirects.map((redirect) => (
            <tr>
              <td>{redirect.url}</td>
              <td>{redirect.to}</td>
              <td>{redirect.visit_count}</td>
            </tr>
          ))}
        </Table>
      </div>
    </Admin>
  )
}
