import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import { Vite } from '#start/view'

export function Footer() {
  return (
    <footer class="footer">
      <MaxWidthWrapper>
        <a class="footer__title" href="/">
          <Vite.Image src={'resources/images/logo.svg'} />
          <span>Romain Lanz</span>
        </a>
      </MaxWidthWrapper>
    </footer>
  )
}
