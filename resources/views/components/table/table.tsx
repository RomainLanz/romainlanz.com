interface TableProps {
  children: JSX.Element
}

export function Table(props: TableProps) {
  const { children } = props

  return (
    <div class="table__wrapper">
      <table class="table">{children}</table>
    </div>
  )
}
