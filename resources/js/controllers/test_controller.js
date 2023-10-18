import { Controller } from '@hotwired/stimulus'

export default class TestController extends Controller {
  #counter = 0

  connect() {
    this.element.textContent = this.#counter
  }

  increment() {
    this.#counter++
    console.log(`TestController#increment: ${this.#counter}`)
    this.element.textContent = this.#counter
  }
}
