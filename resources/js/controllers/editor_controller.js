import 'easymde/dist/easymde.min.css'
import EasyMDE from 'easymde'
import { Controller } from '@hotwired/stimulus'

export default class EditorController extends Controller {
  /**
   * @type {EasyMDE|null}
   */
  #editor = null

  connect() {
    this.#editor = new EasyMDE({
      element: this.element,
      uploadImage: true,
      imageUploadEndpoint: '/api/assets',
    })
  }

  disconnect() {
    this.#editor.cleanup()
  }
}
