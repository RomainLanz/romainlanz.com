import { CodeGroup } from '#views/components/markdown/codegroup'
import { Alert } from '#views/components/alert'
import type { hastTypes } from '@dimerapp/markdown/types'

interface MarkdownRendererProps {
  ast: hastTypes.Element[]
}

export function parseNode(node: hastTypes.Element | hastTypes.Element[]) {
  if (Array.isArray(node)) {
    return node.map(parseNode)
  }

  /**
   * Custom directives
   */

  if (node.properties?.className?.includes('codegroup')) {
    return <CodeGroup tabs={JSON.parse(node.properties.dataTabs)} children={node.children} />
  }

  if (node.properties?.className?.includes('alert')) {
    const type = node.properties.className[1].split('-')[1]

    return <Alert type={type} children={parseNode(node.children)} />
  }

  /**
   * Standard HTML elements
   */

  if (node.tagName === 'h2') {
    return <h2 {...node.properties}>{parseNode(node.children)}</h2>
  }

  if (node.tagName === 'a') {
    return <a {...node.properties}>{parseNode(node.children)}</a>
  }

  if (node.tagName === 'span') {
    return <span {...node.properties}>{parseNode(node.children)}</span>
  }

  if (node.tagName === 'p') {
    return <p {...node.properties}>{parseNode(node.children)}</p>
  }

  if (node.tagName === 'pre') {
    return <pre {...node.properties}>{parseNode(node.children)}</pre>
  }

  if (node.tagName === 'code') {
    return <code {...node.properties}>{parseNode(node.children)}</code>
  }

  if (node.tagName === 'div') {
    return <div {...node.properties}>{parseNode(node.children)}</div>
  }

  if (node.tagName === 'blockquote') {
    return <blockquote {...node.properties}>{parseNode(node.children)}</blockquote>
  }

  if (node.type === 'text') {
    return node.value
  }

  console.log(node)
}

export function MarkdownRenderer(props: MarkdownRendererProps) {
  const { ast } = props

  const jsx = parseNode(ast)

  return <div>{jsx}</div>
}
