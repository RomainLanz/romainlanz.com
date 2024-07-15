interface LabelProps {
  title?: string
  for?: string
  children?: JSX.Element
  required?: boolean
}

export function Label(props: LabelProps) {
  const { title, children, for: htmlFor, required = false } = props

  return (
    <label class="form_label" for={htmlFor}>
      {title ?? children} {required && <span class="text-xs text--danger">*</span>}
    </label>
  )
}
