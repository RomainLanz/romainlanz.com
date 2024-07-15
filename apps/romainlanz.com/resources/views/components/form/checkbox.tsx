interface CheckboxProps {
  name: string
  children?: JSX.Element
}

export function Checkbox(props: CheckboxProps) {
  const { name, children } = props

  return (
    <label class="form__checkbox" for={name}>
      <input id={name} name={name} type="checkbox" />

      {children}
    </label>
  )
}
