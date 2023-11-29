import { App } from '#views/layouts/app'
import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import { route } from '#start/view'

export function Dashboard() {
  return (
    <App title="Dashboard" page="dashboard">
      <MaxWidthWrapper>
        <>
          <h1 class="page_title">Dashboard</h1>
          <div class="dashboard_wrapper">
            <aside class="card">
              <ul>
                <li>
                  <a href={route('admin.blog.posts.create')}>Articles</a>
                </li>
                <li>
                  <a href={route('admin.redirects.index')}>Redirection</a>
                </li>
              </ul>
            </aside>

            <main class="card"></main>
          </div>
        </>
      </MaxWidthWrapper>
    </App>
  )
}
