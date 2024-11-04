import AlertNote from '@rlanz/design-system/alert-note';
import { defineCustomElement } from 'vue';

const AlertNoteElement = defineCustomElement(AlertNote, { shadowRoot: false });
customElements.define('r-alert-note', AlertNoteElement);
