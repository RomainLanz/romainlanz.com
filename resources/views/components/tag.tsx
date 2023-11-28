import { cva } from 'class-variance-authority'

interface TagProps {
  label: string
  color: 'cyan' | 'violet' | 'yellow' | 'red'
}

export function Tag(props: TagProps) {
  const { label, color } = props

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

  return <a class={tag({ color })}>{label}</a>
}
