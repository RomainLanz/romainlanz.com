interface GridProps {
  gap?: number
  columns?: number
  children: JSX.Element
}

export function Grid(props: GridProps) {
  const { gap = 4, columns = 1, children } = props

  return (
    <div
      class="grid"
      style={{
        ['--gap' as any]: `${gap}px`,
        ['--column' as any]: columns,
      }}
    >
      {children}
    </div>
  )
}
