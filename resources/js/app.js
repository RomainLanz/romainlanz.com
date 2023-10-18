import '../css/app.scss'
import * as Turbo from '@hotwired/turbo'
import { Application } from '@hotwired/stimulus'
import EditorController from './controllers/editor_controller.js'
import TestController from './controllers/test_controller.js'

// Import all images and fonts
import.meta.glob(['../fonts/**'])
import.meta.glob(['../images/**'])
window.Stimulus = Application.start()
Stimulus.register('editor', EditorController)
Stimulus.register('test', TestController)

Turbo.start()
