import { MaxWidthWrapper } from '#views/components/max_width_wrapper'
import { currentYear, Vite } from '#start/view'
import { Form } from '#views/components/form/form'
import { Button } from '#views/components/button'
import { SocialNetwork } from '#views/components/social_network'

export function Footer() {
  return (
    <footer class="footer">
      <MaxWidthWrapper>
        <>
          <div class="footer__container">
            <div>
              <a class="footer__title" href="/">
                <Vite.Image src={'resources/images/logo_mono.svg'} alt="" />
                <span class="visually-hidden">Romain Lanz</span>
              </a>
            </div>

            <section class="footer__section">
              <h4>Réseau&nbsp;sociaux</h4>
              <ul>
                <li>
                  <SocialNetwork name="GitHub" link="https://github.com/RomainLanz" />
                </li>
                <li>
                  <SocialNetwork name="Twitch" link="https://www.twitch.tv/romainlanz" />
                </li>
                <li>
                  <SocialNetwork name="X (Twitter)" icon="x" link="https://x.com/romainlanz" />
                </li>
                <li>
                  <SocialNetwork name="YouTube" link="https://www.youtube.com/c/RomainLanz" />
                </li>
              </ul>
            </section>

            {/*<nav class="footer__section" aria-labelledby="footer-navigation-heading">*/}
            {/*  <h4 id="footer-navigation-heading">Navigation</h4>*/}
            {/*  <ul>*/}
            {/*    <li>*/}
            {/*      <a href="">Articles</a>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*      <a href="">Twitch</a>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*      <a href="">X (Twitter)</a>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*      <a href="">YouTube</a>*/}
            {/*    </li>*/}
            {/*  </ul>*/}
            {/*</nav>*/}

            <section class="footer__section">
              <h4>Partners</h4>

              <ul class="partners">
                <li>
                  <a href="https://m.do.co/c/cc9e0b565057" rel="sponsored">
                    <Vite.Image
                      src={'resources/images/partners/digitalocean.svg'}
                      alt="DigitalOcean"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://app.codecrafters.io/join?via=RomainLanz" rel="sponsored">
                    <Vite.Image
                      src={'resources/images/partners/codecrafters.svg'}
                      alt="CodeCrafters"
                    />
                  </a>
                </li>
              </ul>
            </section>

            <section id="newsletter_registration" class="footer__section">
              <h4>Newsletter</h4>

              <p>Inscrivez-vous à la newsletter pour recevoir les derniers articles.</p>

              <form action="" method="post">
                <Form.Input name="email" type="email" />
                <Button size="small" type="submit">
                  S'abonner
                </Button>
              </form>
            </section>
          </div>

          <hr />

          <div class="footer__copyright">
            <a href="#">Mentions légales</a>
            <span>&copy; {currentYear()} Romain Lanz</span>
          </div>
        </>
      </MaxWidthWrapper>
    </footer>
  )
}
