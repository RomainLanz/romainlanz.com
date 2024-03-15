import 'easymde/dist/easymde.min.css'
import EasyMDE from 'easymde'

class EasyMDEComponent extends HTMLElement {
  get name() {
    return this.getAttribute('name') || ''
  }

  static get observedAttributes() {
    return ['name']
  }

  connectedCallback() {
    // @see https://stackoverflow.com/a/61171167
    // @ts-ignore
    this.value = ''

    const element = document.createElement('textarea')

    // Forward the name attribute to the textarea
    element.id = this.name
    element.name = this.name

    this.appendChild(element)

    const editor = new EasyMDE({
      element: this,
      uploadImage: true,
      imageUploadEndpoint: '/api/assets/images',
    })

    editor.codemirror.on('change', () => {
      element.value = editor.value()
    })
  }
}

customElements.define('easy-mde', EasyMDEComponent)
