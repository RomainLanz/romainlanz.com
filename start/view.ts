import edge from 'edge.js'
import { cx, cva } from 'class-variance-authority'

edge.global('cva', function (base: Parameters<typeof cva>[0], config: Parameters<typeof cva>[1]) {
  return cva(base, config)
})

edge.global('cx', function (inputs: Parameters<typeof cx>) {
  return cx(inputs)
})

edge.global('range', function (start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i)
})
