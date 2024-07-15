import Element = JSX.Element

export function Layout(props: { children: Element }) {
  const { children } = props

  return (
    <mjml>
      <mj-head>
        <mj-title>Discount Light</mj-title>
      </mj-head>

      <mj-body background-color="#E7E7E7" width="600px">
        {children}
      </mj-body>
    </mjml>
  )
}
