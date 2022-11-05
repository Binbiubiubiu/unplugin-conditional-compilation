import { resolve } from 'path'
import fs from 'fs-extra'
import { describe, expect, it } from 'vitest'

const r = (...args: string[]) => resolve(__dirname, '../dist', ...args)

describe('filter build', () => {
  it('vite', async () => {
    const content = await fs.readFile(r('vite/main.js'), 'utf-8')

    expect(content).toContain('foo in dev')
  })

  it.fails('rollup', async () => {
    const content = await fs.readFile(r('rollup/main.js'), 'utf-8')

    expect(content).toContain('foo in dev')
  })

  it('webpack', async () => {
    const content = await fs.readFile(r('webpack/main.js'), 'utf-8')

    expect(content).toContain('foo in dev')
  })

  it('esbuild', async () => {
    const content = await fs.readFile(r('esbuild/main.js'), 'utf-8')

    expect(content).toContain('foo in dev')
  })
})
