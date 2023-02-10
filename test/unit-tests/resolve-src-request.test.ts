import path from 'path'
import { describe, expect, it } from 'vitest'
import { resolveSrcRequest as mf } from '@/core'

const pwd = process.cwd()
const r = (...args: string[]) => path.resolve(pwd, ...args)

describe('resolve src request', () => {
  it('/foo,/a/b -> /foo', async () => {
    expect(mf(r('foo'), '/a/b')).toEqual(r('foo'))
  })

  it('./foo,/a/b -> /a/foo', async () => {
    expect(mf('./foo', r('a', 'b'))).toEqual(r('a', 'foo'))
  })

  // eslint-disable-next-line no-template-curly-in-string
  it('./foo,/a/b -> /${pwd}/foo', async () => {
    expect(mf('./foo', '')).toEqual(r('foo'))
  })

  it('/foo.js,/a/b -> ', async () => {
    expect(mf(r('foo.js'), r('a', 'b'))).toBe(undefined)
  })

  it('./foo.js,/a/b -> ', async () => {
    expect(mf('./foo.js', r('a', 'b'))).toBe(undefined)
  })

  it('./foo.js, -> ', async () => {
    expect(mf('./foo.js', '')).toBe(undefined)
  })

  it('/foo.vue,/a/b -> /foo', async () => {
    expect(mf(r('foo.vue'), r('a', 'b'))).toEqual(r('foo'))
  })

  it('./foo.vue,/a/b -> /a/foo', async () => {
    expect(mf('./foo.vue', r('a', 'b'))).toEqual(r('a', 'foo'))
  })

  // eslint-disable-next-line no-template-curly-in-string
  it('./foo.vue, -> /${pwd}/foo', async () => {
    expect(mf('./foo.vue', '')).toEqual(r('foo'))
  })
})
