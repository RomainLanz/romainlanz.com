interface EasyMDEProps {
  name: string
}

export function EasyMDE(props: EasyMDEProps) {
  const { name } = props

  return <easy-mde name={name}></easy-mde>
}
