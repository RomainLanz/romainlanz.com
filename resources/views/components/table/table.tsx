interface TableProps {
  children: JSX.Element
}

export function Table(props: TableProps) {
  const { children } = props

  return <table>{children}</table>
}
