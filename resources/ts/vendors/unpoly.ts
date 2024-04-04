import 'unpoly'

declare var up: any

// Follows all links by default
up.link.config.followSelectors.push('a[href]')

// Preloads all links by default
up.link.config.preloadSelectors.push('a[href]')

// Handle all forms by default
up.form.config.submitSelectors.push(['form'])

up.compiler('[load-fragment]', (el) => {
  up.reload(el)
})
