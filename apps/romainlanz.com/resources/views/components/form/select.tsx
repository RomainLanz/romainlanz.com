type SelectValue = string | number

interface SelectProps {
  name: string
  options: Array<{ label: string; value: SelectValue }>
  selected?: SelectValue
}

export function Select(props: SelectProps) {
  const { name, options, selected } = props

  return (
    <select id={name} name={name} class="form_control">
      {options.map((option) => (
        <option
          value={option.value}
          selected={typeof selected !== 'undefined' ? option.value === selected : false}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}
