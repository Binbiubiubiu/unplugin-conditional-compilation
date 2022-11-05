import type { FilterPattern } from 'vite'

export interface Options {
  // define your plugin options here
  extensions?: string[]
  include?: FilterPattern
  exclude?: FilterPattern
  cwd?: string | false | null
  env?: string
  envVar?: string
}
