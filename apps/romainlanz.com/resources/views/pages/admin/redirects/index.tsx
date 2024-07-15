import { csrfField, route, space } from '#start/view'
import { Button } from '#views/components/button'
import { Admin } from '#views/layouts/admin'
import { Table } from '#views/components/table/table'
import type { RedirectListQueryResult } from '#redirects/repositories/redirect_repository'

interface IndexProps {
  redirects: RedirectListQueryResult
}

export function Index(props: IndexProps) {
  const { redirects } = props

  return (
    <Admin title="Redirections">
      <div class="d-flex column" style={{ gap: space(5) }}>
        <div>
          <Button
            href={route('admin.redirects.create')}
            up-layer="new"
            up-mode="modal"
            up-target="[up-modal-scope]"
          >
            Ajouter
          </Button>
        </div>

        <Table headers={['URL', 'À', 'Visites', '']}>
          {redirects.map((redirect) => (
            <tr>
              <td>{redirect.url}</td>
              <td>{redirect.to}</td>
              <td>{redirect.visit_count}</td>
              <td>
                <form
                  action={route('admin.redirects.delete', [redirect.id]) + '?_method=DELETE'}
                  method="post"
                >
                  {csrfField()}
                  <Button type="submit" blank>
                    Supprimer
                  </Button>
                </form>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </Admin>
  )
}
