import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import { Vite, csrfField, route, space } from '#start/view'
import { HttpContext } from '@adonisjs/core/http'
import { Button } from '#views/components/button'

export async function Header() {
  const { auth } = HttpContext.getOrFail()

  await auth.check()

  return (
    <header>
      <MaxWidthWrapper class="header">
        <a class="header__title" href="/">
          <Vite.Image src={'resources/images/logo.svg'} />
          <span>Romain Lanz</span>
        </a>

        {auth.user ? (
          <div
            class="d-flex items-center"
            style={{
              gap: space(3),
            }}
          >
            <a href={route('admin.pages.dashboard')}>Admin</a>

            <span>|</span>

            <span>{auth.user.email}</span>

            <form
              action={`${route('auth.logout')}?_method=DELETE`}
              method="post"
              up-target="header"
            >
              {csrfField()}

              <Button size="small" type="submit">
                Se déconnecter
              </Button>
            </form>
          </div>
        ) : (
          <a href={route('auth.login')} up-layer="new" up-mode="modal">
            Se connecter
          </a>
        )}
      </MaxWidthWrapper>
    </header>
  )
}
