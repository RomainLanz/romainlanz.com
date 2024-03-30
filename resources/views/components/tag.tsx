import { cva } from 'class-variance-authority'

interface TagProps {
  label: string
  color: 'cyan' | 'violet' | 'yellow' | 'red'
  isLink?: boolean
}

export function Tag(props: TagProps) {
  const { label, color, isLink = false } = props

  const tag = cva('tag', {
    variants: {
      color: {
        cyan: 'cyan',
        red: 'red',
        violet: 'violet',
        yellow: 'yellow',
      },
    },
  })

  if (isLink) {
    return <a class={tag({ color })}>{label}</a>
  }

  return <span class={tag({ color })}>{label}</span>
}
