import '../css/app.scss'
import * as Turbo from '@hotwired/turbo'

// Import all images and fonts
import.meta.glob(['../fonts/**'])
import.meta.glob(['../images/**'])

Turbo.start()
