import { cx } from 'class-variance-authority'
import { InfoCircleIcon } from '#views/components/icons/info_circle_icon'
import { ErrorIcon } from '#views/components/icons/error_icon'
import { SuccessIcon } from '#views/components/icons/success_icon'

const AlertIcon = {
  note: InfoCircleIcon,
  info: InfoCircleIcon,
  danger: ErrorIcon,
  warning: ErrorIcon,
  error: ErrorIcon,
  success: SuccessIcon,
} as const

interface AlertProps {
  type: keyof typeof AlertIcon
  title?: string
  children: JSX.Element
}

export function Alert(props: AlertProps) {
  const { type, title, children } = props

  const classes = cx('alert', type, {
    'with-title': !!title,
  })

  return (
    <section class={classes} role="alert">
      {!title && <div class="icon">{AlertIcon[type]}</div>}

      {title && (
        <header>
          <div class="icon">{AlertIcon[type]}</div>
          <strong>{title}</strong>
        </header>
      )}

      {children}
    </section>
  )
}
