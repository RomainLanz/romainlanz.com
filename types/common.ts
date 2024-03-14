export type ResultOf<Class, Method extends keyof Class> = Class[Method] extends (
  ...args: any[]
) => infer R
  ? Awaited<R>
  : never
