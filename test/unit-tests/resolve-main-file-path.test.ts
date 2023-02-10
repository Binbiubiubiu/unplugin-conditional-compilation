import path from 'path'
import { describe, expect, it } from 'vitest'
import { resolveMainFilePath } from '@/core'
import { SCRIPT_EXT } from '@/core/constants'

const r = (p: string) => {
  p = p.startsWith('/') ? p.slice(1) : p
  return path.resolve(__dirname, 'test-src', p)
}
const mf = (p: string, env = '', exts = SCRIPT_EXT) => {
  return resolveMainFilePath(r(p), exts, env)
}

describe('resolve main file path', () => {
  it('/foo,, -> /foo.ts', async () => {
    expect(mf('/foo')).toEqual(r('/foo.ts'))
  })

  it('/foo,dev, -> /foo.ts', async () => {
    expect(mf('/foo', 'dev')).toEqual(r('/foo.dev.ts'))
  })

  it('/foo,,[.js] -> /foo.ts', async () => {
    expect(mf('/foo', '', ['.js'])).toBe(undefined)
  })

  it('/foo,dev,[.js] -> /foo.ts', async () => {
    expect(mf('/foo', 'dev', ['.js'])).toBe(undefined)
  })
})
