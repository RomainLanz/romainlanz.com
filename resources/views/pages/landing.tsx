import { App } from '#views/layouts/app'
import { Hero } from '#views/partials/hero'
import { Flex } from '#views/components/flex'
import { Grid } from '#views/components/grid'
import { Article } from '#views/components/article/article'

export function Landing() {
  return (
    <App>
      <>
        <Hero />

        <main class="max-width-wrapper">
          <Flex class="mb-6" align="baseline" justify="space-between">
            <>
              <h3 class="section-title">Mes derniers articles</h3>
              <a class="uppercase" href="/articles">
                Tous
              </a>
            </>
          </Flex>

          <Grid columns={2} gap={16}>
            <>
              <Article.Card
                class="grid-span-1"
                date={'Feb 16th 2023'}
                title="Data URLs and Pool in your URL"
                tags={[{ color: 'cyan', label: 'JavaScript' }]}
              >
                Sed lobortis urna in tempus condimentum. Vestibulum cursus porta elit in
                condimentum. Donec bibendum lacus vel sem luctus bibendum.
              </Article.Card>

              <Article.Card
                class="grid-span-1"
                date={'Feb 16th 2023'}
                title="Data URLs and Pool in your URL"
                tags={[{ color: 'cyan', label: 'JavaScript' }]}
              >
                Sed lobortis urna in tempus condimentum. Vestibulum cursus porta elit in
                condimentum. Donec bibendum lacus vel sem luctus bibendum.
              </Article.Card>

              <Article.Card
                class="grid-span-1"
                date={'Feb 16th 2023'}
                title="Data URLs and Pool in your URL"
                tags={[{ color: 'cyan', label: 'JavaScript' }]}
              >
                Sed lobortis urna in tempus condimentum. Vestibulum cursus porta elit in
                condimentum. Donec bibendum lacus vel sem luctus bibendum.
              </Article.Card>

              <Article.Card
                class="grid-span-1"
                date={'Feb 16th 2023'}
                title="Data URLs and Pool in your URL"
                tags={[{ color: 'cyan', label: 'JavaScript' }]}
              >
                Sed lobortis urna in tempus condimentum. Vestibulum cursus porta elit in
                condimentum. Donec bibendum lacus vel sem luctus bibendum.
              </Article.Card>
            </>
          </Grid>
        </main>
      </>
    </App>
  )
}
