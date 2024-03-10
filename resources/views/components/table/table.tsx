interface TableProps {
  headers?: string[]
  children: JSX.Element
}

export function Table(props: TableProps) {
  const { headers, children } = props

  return (
    <div class="table__wrapper">
      <table class="table">
        {headers && (
          <thead>
            <tr>
              {headers.map((header) => (
                <th>{header}</th>
              ))}
            </tr>
          </thead>
        )}
        {headers ? <tbody>{children}</tbody> : children}
      </table>
    </div>
  )
}
