import { parseNode } from '#views/components/markdown_renderer'

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
              {parseNode(child)}
            </div>
          ) : (
            <div data-tab-content={index} class="codegroup__tab visually-hidden">
              {parseNode(child)}
            </div>
          )
        )}
      </div>
    </code-group>
  )
}
