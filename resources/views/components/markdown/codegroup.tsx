import type { hastTypes } from '@dimerapp/markdown/types'

export function parseCodeNode(node: hastTypes.Element | hastTypes.Element[]) {
  if (Array.isArray(node)) {
    return node.map(parseCodeNode)
  }

  if (node.tagName === 'pre') {
    return <pre {...node.properties}>{parseCodeNode(node.children)}</pre>
  }

  if (node.tagName === 'code') {
    return <code {...node.properties}>{parseCodeNode(node.children)}</code>
  }

  if (node.tagName === 'div') {
    return <div {...node.properties}>{parseCodeNode(node.children)}</div>
  }

  if (node.tagName === 'span') {
    return (
      <span {...node.properties} safe>
        {parseCodeNode(node.children)}
      </span>
    )
  }

  if (node.type === 'text') {
    return node.value
  }

  console.log(node)
}

interface CodeGroupProps {
  tabs: string[]
  children: JSX.Element[]
}

export function CodeGroup(props: CodeGroupProps) {
  const { tabs, children } = props

  return (
    <code-group class="codegroup" tabs={tabs}>
      <header>
        <div>
          {tabs.map((tab, index) => (
            <button data-tab-name={tab} data-tab-content={index}>
              {tab}
            </button>
          ))}
        </div>

        <div class="window__actions">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>

      <div class="codegroup__content">
        {children.map((child, index) =>
          index <= 0 ? (
            <div data-tab-content={index} class="codegroup__tab">
              {parseCodeNode(child)}
            </div>
          ) : (
            <div data-tab-content={index} class="codegroup__tab visually-hidden">
              {parseCodeNode(child)}
            </div>
          )
        )}
      </div>
    </code-group>
  )
}
