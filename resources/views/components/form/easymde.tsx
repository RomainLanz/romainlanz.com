interface EasyMDEProps {
  name: string
  defaultValue?: string
}

export function EasyMDE(props: EasyMDEProps) {
  const { name, defaultValue } = props

  return <easy-mde name={name} defaultValue={defaultValue}></easy-mde>
}
