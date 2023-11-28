import { cva } from 'class-variance-authority'

interface ButtonProps {
  color?: 'cyan' | 'violet' | 'yellow'
  href?: string
  size?: 'small' | 'medium'
  children: JSX.Element
}

export function Button(props: ButtonProps) {
  const { color, href, children, size = 'medium', ...extraProps } = props

  const button = cva('button', {
    variants: {
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

  if (typeof href !== 'undefined') {
    return (
      <a class={button({ color, size })} href={href}>
        {children}
      </a>
    )
  }

  return (
    <button class={button({ color, size })} {...extraProps}>
      {children}
    </button>
  )
}
