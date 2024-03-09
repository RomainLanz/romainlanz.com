declare global {
  namespace JSX {
    interface FormTag {
      ['up-submit']?: boolean
    }
  }
}
