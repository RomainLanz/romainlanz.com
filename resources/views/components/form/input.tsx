import { HttpContext } from '@adonisjs/core/http'

interface InputProps {
  name: string
}

export function Input(props: InputProps) {
  const { name, ...extraProps } = props

  const { session } = HttpContext.getOrFail()
  const flashMessages = session.flashMessages

  const oldValue = flashMessages.get(name) || ''
  const error = flashMessages.get(`errors.${name}`) || ''

  return (
    <>
      <input class="form_control" id={name} name={name} value={oldValue} {...extraProps} />

      {error && <span class="form_error">{error}</span>}
    </>
  )
}
