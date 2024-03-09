import { route } from '#start/view'

export function Sidebar() {
  return (
    <aside class="admin_sidebar">
      <ul>
        <li>
          <a href={route('admin.blog.posts.index')}>Articles</a>
        </li>
        <li>
          <a href={route('admin.redirects.index')}>Redirection</a>
        </li>
      </ul>
    </aside>
  )
}
