import Codeblock from '@rlanz/design-system/codeblock';
import { defineCustomElement } from 'vue';

const CodeblockElement = defineCustomElement(Codeblock, { shadowRoot: false });
customElements.define('r-codeblock', CodeblockElement);
