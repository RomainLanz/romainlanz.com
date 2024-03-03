import { Flex } from '#views/components/flex'
import { Button } from '#views/components/button'
import { Vite } from '#start/view'

export function Hero() {
  return (
    <section class="hero max-width-wrapper">
      <Flex gap={8}>
        <>
          <Flex direction="column" gap={24}>
            <>
              <h2>
                Salut, je suis <span>Romain Lanz,</span>
                <br /> un développeur Full Stack JavaScript.
              </h2>

              <p>
                Cras mattis enim orci, at feugiat nunc euismod nec. Donec elementum in arcu
                imperdiet. Proin in lacinia enim.
              </p>

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
