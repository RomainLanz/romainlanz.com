import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import { Vite, csrfField, route, space } from '#start/view'
import { HttpContext } from '@adonisjs/core/http'
import { Button } from '#views/components/button'

export async function Header() {
  const { auth } = HttpContext.getOrFail()

  await auth.check()

  return (
    <header id="the-header">
      <MaxWidthWrapper class="header">
        <div>
          <a class="header__title" href="/">
            <Vite.Image src={'resources/images/logo.svg'} />
            <span>Romain Lanz</span>
          </a>

          <div id="live-status" up-source="/live/status" load-fragment></div>
        </div>

        {auth.user ? (
          <div
            class="d-flex items-center"
            style={{
              gap: space(3),
            }}
          >
            <a href={route('admin.pages.dashboard')}>Admin</a>

            <span>|</span>

            <span safe>{auth.user.email}</span>

            <form action={`${route('auth.logout')}?_method=DELETE`} method="post">
              {csrfField()}

              <Button size="small" type="submit">
                Se déconnecter
              </Button>
            </form>
          </div>
        ) : (
          <a
            href={route('auth.login')}
            up-layer="new"
            up-accept-location={route('pages.landing')}
            up-on-accepted="up.render('#the-header', { response: event.response })"
          >
            Se connecter
          </a>
        )}
      </MaxWidthWrapper>
    </header>
  )
}
