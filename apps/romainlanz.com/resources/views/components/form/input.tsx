import { HttpContext } from '@adonisjs/core/http'

interface InputProps {
  name: string
  type?: string
}

export function Input(props: InputProps) {
  const { name, type = 'text', ...extraProps } = props

  const { session } = HttpContext.getOrFail()
  const flashMessages = session.flashMessages

  const oldValue = flashMessages.get(name) || ''
  const error = flashMessages.get(`errors.${name}`) || ''

  return (
    <>
      <input
        class="form_control"
        id={name}
        name={name}
        type={type}
        value={oldValue}
        {...extraProps}
      />

      {error && <span class="form_error">{error}</span>}
    </>
  )
}
