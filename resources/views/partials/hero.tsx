import { Flex } from '#views/components/flex'
import { Button } from '#views/components/button'
import { Vite } from '#start/view'

export function Hero() {
  return (
    <section class="hero max-width-wrapper">
      <Flex>
        <>
          <Flex direction="column" gap={24}>
            <>
              <h1>
                Apprenez le <span>JavaScript</span>
                <br /> à travers différents articles et vidéos
              </h1>

              <Flex gap={16}>
                <>
                  <Button color={'violet'}>Articles</Button>
                  <Button color={'yellow'}>Contact</Button>
                </>
              </Flex>
            </>
          </Flex>

          <Vite.Image src={'resources/images/hero.svg'} />
        </>
      </Flex>
    </section>
  )
}
