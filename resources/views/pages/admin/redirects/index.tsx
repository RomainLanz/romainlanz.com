import Redirect from '#redirects/models/redirect'
import { App } from '#views/layouts/app'
import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import { route } from '#start/view'
import { Button } from '#views/components/button'

interface IndexProps {
  redirects: Redirect[]
}

export function Index(props: IndexProps) {
  const { redirects } = props

  return (
    <App title="Redirections">
      <MaxWidthWrapper>
        <h1 class="page_title">Redirections</h1>

        <Button href={route('admin.redirects.create')}>Ajouter</Button>

        <table>
          <thead>
            <tr>
              <th>from</th>
              <th>to</th>
            </tr>
          </thead>
          <tbody>
            {redirects.map((redirect) => (
              <tr>
                <td>{redirect.createdAt.toISODate()}</td>
                <td>{redirect.url}</td>
                <td>{redirect.to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </MaxWidthWrapper>
    </App>
  )
}
