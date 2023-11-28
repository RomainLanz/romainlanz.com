import { App } from '#views/layouts/app'
import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import { route } from '#start/view'

export function Dashboard() {
  return (
    <App title="Dashboard">
      <MaxWidthWrapper>
        <aside>
          <ul>
            <li>
              <a href={route('admin.blog.posts.create')}>Post Create</a>
            </li>
          </ul>
        </aside>
      </MaxWidthWrapper>
    </App>
  )
}
