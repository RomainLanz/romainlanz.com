import { cx } from 'class-variance-authority'

interface FlexProps {
  children: JSX.Element
  class?: string
  gap?: number
  direction?: 'row' | 'column'
  align?: 'start' | 'center' | 'end' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'space-between'
}

export function Flex(props: FlexProps) {
  const { class: className, children } = props

  const classes = cx(['flex', className])

  return (
    <div
      class={classes}
      style={{
        ['--gap' as any]: `${props.gap ?? 0}px`,
        ['--direction' as any]: props.direction ?? 'row',
        ['--align' as any]: props.align ?? 'start',
        ['--justify' as any]: props.justify ?? 'start',
      }}
    >
      {children}
    </div>
  )
}
