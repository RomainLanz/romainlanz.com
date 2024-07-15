const kTabHiddenClass = 'visually-hidden'

export class CodeGroupComponent extends HTMLElement {
  #tabButtonEls: NodeListOf<HTMLElement>
  #tabContentEls: NodeListOf<HTMLElement>

  static observedAttributes = ['tabs', 'current-tab']

  get tabs() {
    return this.getAttribute('tabs') || ''
  }

  set currentTab(value: number) {
    this.setAttribute('current-tab', value.toString())
  }

  connectedCallback() {
    this.querySelectorAll('[data-tab-name]').forEach((tab, index) => {
      tab.addEventListener('click', () => {
        this.currentTab = index
      })
    })

    this.#tabButtonEls = this.querySelectorAll('button[data-tab-name]')
    this.#tabContentEls = this.querySelectorAll('div[data-tab-content]')

    this.currentTab = 0
    this.#updateCurrentTabDisplay(0)
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === 'current-tab') {
      this.#updateCurrentTabDisplay(Number.parseInt(newValue))
    }
  }

  #updateCurrentTabDisplay(currentTab: number) {
    this.#tabButtonEls.forEach((button) => {
      const index = Number.parseInt(button.getAttribute('data-tab-content'))

      if (index === currentTab) {
        button.classList.add('active')
      } else {
        button.classList.remove('active')
      }
    })

    this.#tabContentEls.forEach((content) => {
      const index = Number.parseInt(content.getAttribute('data-tab-content'))

      if (index === currentTab) {
        content.classList.remove(kTabHiddenClass)
      } else {
        content.classList.add(kTabHiddenClass)
      }
    })
  }
}

customElements.define('code-group', CodeGroupComponent)
