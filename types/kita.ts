declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['easy-mde']: HtmlTextAreaTag
    }

    interface FormTag {
      ['up-submit']?: boolean
    }
  }
}
