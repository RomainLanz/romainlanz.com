declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['easy-mde']: HtmlTextAreaTag & {
        defaultValue?: string
      }
      ['code-group']: HtmlTag
    }

    interface HtmlTag {
      ['up-main']?: boolean
      ['up-hungry']?: boolean
      ['up-source']?: string
      ['load-fragment']?: boolean
    }

    interface HtmlAnchorTag {
      ['up-follow']?: boolean
      ['up-target']?: string
      ['up-layer']?: 'new' | 'swap' | 'shatter'
      ['up-accept-location']?: string
      ['up-mode']?: 'root' | 'modal' | 'drawer' | 'popup' | 'cover'
      ['up-on-accepted']?: string
    }

    interface HtmlFormTag {
      ['up-submit']?: boolean
      ['up-target']?: string
    }
  }
}
