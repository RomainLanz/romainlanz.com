import 'unpoly'

// Import all images and fonts -- Needed for Vite
import.meta.glob(['../fonts/**'])
import.meta.glob(['../images/**'])

// Follows all links by default
up.link.config.followSelectors.push('a[href]')

// Preloads all links by default
up.link.config.preloadSelectors.push('a[href]')

// Handle all forms by default
up.form.config.submitSelectors.push(['form'])
