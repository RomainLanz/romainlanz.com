interface EasyMDEProps {
  name: string
}

export function EasyMDE(props: EasyMDEProps) {
  const { name } = props

  return <textarea id={name} name={name} data-controller="editor"></textarea>
}
