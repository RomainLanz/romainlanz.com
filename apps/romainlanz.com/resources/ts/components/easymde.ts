import 'easymde/dist/easymde.min.css'
import EasyMDE from 'easymde'

class EasyMDEComponent extends HTMLElement {
  get name() {
    return this.getAttribute('name') || ''
  }

  get defaultValue() {
    return this.getAttribute('defaultValue') || ''
  }

  static get observedAttributes() {
    return ['name', 'defaultValue']
  }

  connectedCallback() {
    // @see https://stackoverflow.com/a/61171167
    // @ts-ignore
    this.value = ''

    const element = document.createElement('textarea')

    // Forward the name attribute to the textarea
    element.id = this.name
    element.name = this.name
    element.value = this.defaultValue

    this.appendChild(element)

    const editor = new EasyMDE({
      element: this,
      uploadImage: true,
      imageUploadEndpoint: '/api/assets/images',
      initialValue: this.defaultValue,
      inputStyle: 'contenteditable',
      spellChecker: false,
      nativeSpellcheck: true,
    })

    editor.codemirror.on('change', () => {
      element.value = editor.value()
    })
  }
}

customElements.define('easy-mde', EasyMDEComponent)
