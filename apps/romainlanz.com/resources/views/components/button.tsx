import { cva } from 'class-variance-authority'

interface ButtonProps {
  blank?: boolean
  color?: 'cyan' | 'violet' | 'yellow'
  href?: string
  size?: 'small' | 'medium'
  type?: 'button' | 'submit'
  children: JSX.Element
}

export function Button(props: ButtonProps) {
  const { href, children, type = 'button', size = 'medium', ...extraProps } = props

  const button = cva('button', {
    variants: {
      styled: {
        blank: 'blank',
      },
      color: {
        cyan: 'cyan',
        violet: 'violet',
        yellow: 'yellow',
      },
      size: {
        small: 'small',
        medium: 'medium',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  })

  const classes = button({
    size,
    ...(props.blank && { styled: 'blank' }),
    ...('color' in props && { color: props.color }),
  })

  if (typeof href !== 'undefined') {
    return (
      <a class={classes} href={href} {...extraProps}>
        {children}
      </a>
    )
  }

  return (
    <button class={classes} type={type} {...extraProps}>
      {children}
    </button>
  )
}
