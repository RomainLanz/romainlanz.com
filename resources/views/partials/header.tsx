import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import { Assets, csrfField, route, space } from '#start/view'
import { HttpContext } from '@adonisjs/core/http'
import { Button } from '#views/components/button'

export function Header() {
  const { user } = HttpContext.getOrFail()

  return (
    <MaxWidthWrapper>
      <header class="header">
        <a class="header__title" href="/">
          <Assets.Image src={'resources/images/logo.svg'} />
          <span>Romain Lanz</span>
        </a>

        {user && (
          <div
            class="d-flex items-center"
            style={{
              gap: space(3),
            }}
          >
            <a href={route('admin.pages.dashboard')}>Admin</a>

            <span>|</span>

            <span>{user.email}</span>

            <form action={`${route('auth.logout')}?_method=DELETE`} method="post">
              {csrfField()}
              <Button size="small" type="submit">
                Se déconnecter
              </Button>
            </form>
          </div>
        )}
      </header>
    </MaxWidthWrapper>
  )
}
