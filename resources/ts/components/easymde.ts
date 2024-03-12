import 'easymde/dist/easymde.min.css'
import EasyMDE from 'easymde'

class EasyMDEComponent extends HTMLElement {
  name: string

  static get observedAttributes() {
    return ['name']
  }

  connectedCallback() {
    this.innerHTML = `<textarea id="${this.name}" name="${this.name}"></textarea>`

    // @see https://stackoverflow.com/a/61171167
    // @ts-ignore
    this.value = ''

    new EasyMDE({
      element: this,
      uploadImage: true,
      imageUploadEndpoint: '/api/assets/images',
    })
  }
}

customElements.define('easy-mde', EasyMDEComponent)
