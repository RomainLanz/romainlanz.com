import Redirect from '#redirects/models/redirect'
import { App } from '#views/layouts/app'
import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import { route } from '#start/view'

interface IndexProps {
  redirects: Redirect[]
}

export function Index(props: IndexProps) {
  const { redirects } = props

  return (
    <App title="Redirections">
      <MaxWidthWrapper>
        <h1>redirects</h1>

        <a href={route('admin.redirects.create')}>Ajouter</a>

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
