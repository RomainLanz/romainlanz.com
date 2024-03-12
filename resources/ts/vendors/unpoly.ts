import 'unpoly'

// Follows all links by default
// @ts-expect-error - Who cares?
up.link.config.followSelectors.push('a[href]')

// Preloads all links by default
// @ts-expect-error - Who cares?
up.link.config.preloadSelectors.push('a[href]')

// Handle all forms by default
// @ts-expect-error - Who cares?
up.form.config.submitSelectors.push(['form'])
