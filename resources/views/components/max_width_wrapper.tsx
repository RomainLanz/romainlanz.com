export function MaxWidthWrapper(props: { class?: string; children: JSX.Element }) {
  return <div class={`max-width-wrapper ${props.class}`}>{props.children}</div>
}
