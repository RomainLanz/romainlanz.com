import { cx } from 'class-variance-authority'
import { Flex } from '../flex.js'
import { Tag } from '../tag.js'

interface CardProps {
  class: string
  title: string
  date: string
  children: JSX.Element
  href: string
  tags: Array<{ label: string; color: 'cyan' | 'violet' | 'yellow' | 'red' }>
}

export function Card(props: CardProps) {
  const { class: className, href, title, date, children, tags } = props

  const classes = cx(['card clickable', className])

  return (
    <a href={href}>
      <article class={classes}>
        <Flex class="h-full" gap={16} direction="column">
          <header>
            <time>{date}</time>
            <h2>{title}</h2>
          </header>

          <p class="grow">{children}</p>

          <Flex gap={8}>
            {tags.map((tag) => (
              <Tag color={tag.color} label={tag.label} />
            ))}
          </Flex>
        </Flex>
      </article>
    </a>
  )
}
