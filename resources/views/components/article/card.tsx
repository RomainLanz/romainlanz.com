import { cx } from 'class-variance-authority'
import { Flex } from '../flex.js'
import { Tag } from '../tag.js'

interface CardProps {
  class: string
  title: string
  date: string
  children: JSX.Element
  tags: Array<{ label: string; color: 'cyan' | 'violet' | 'yellow' | 'red' }>
}

export function Card(props: CardProps) {
  const { class: className, title, date, children, tags } = props

  const classes = cx(['card with-hover', className])

  return (
    <article class={classes}>
      <Flex class="h-full" gap={16} direction="column">
        <header>
          <time>{date}</time>
          <h2>{title}</h2>
        </header>

        <p class="grow">{children}</p>

        <Flex class="w-full" gap={12} align="center" justify="space-between">
          <Flex gap={8}>
            {tags.map((tag) => (
              <Tag color={tag.color} label={tag.label} />
            ))}
          </Flex>

          <a href="">Read</a>
        </Flex>
      </Flex>
    </article>
  )
}