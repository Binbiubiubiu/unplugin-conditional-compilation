import fs from 'node:fs'
import path from 'node:path'

import { EXT_WHITE_LIST, SCRIPT_EXT } from './constants'

/**
 * resolve p to the file with `.env` suffix;
 */
export function resolveMainFilePath(
  p: string,
  extArrs = SCRIPT_EXT,
  env?: string,
): string | undefined {
  for (let i = 0; i < extArrs.length; i++) {
    const item = extArrs[i]
    if (env) {
      if (fs.existsSync(`${p}.${env}${item}`))
        return `${p}.${env}${item}`

      if (fs.existsSync(`${p}${path.sep}index.${env}${item}`))
        return `${p}${path.sep}index.${env}${item}`

      if (fs.existsSync(`${p.replace(/\/index$/, `.${env}/index`)}${item}`))
        return `${p.replace(/\/index$/, `.${env}/index`)}${item}`
    }
    if (fs.existsSync(`${p}${item}`))
      return `${p}${item}`

    if (fs.existsSync(`${p}${path.sep}index${item}`))
      return `${p}${path.sep}index${item}`
  }
}

/**
 *  get absolute path
 *
 * - /foo,/a/b -> /foo
 * - ./foo,/a/b -> /a/foo
 * - ./foo, -> /${pwd}/foo
 * - /foo.js,/a/b ->
 * - ./foo.js,/a/b ->
 * - ./foo.js, ->
 * - /foo.vue,/a/b -> /foo
 * - ./foo.vue,/a/b  -> /a/foo
 * - ./foo.vue, -> /${pwd}/foo
 */
export function resolveSrcRequest(
  id: string,
  importer?: string,
): string | undefined {
  const ext = path.extname(id)

  if (ext) {
    if (!EXT_WHITE_LIST.includes(ext))
      return
    // in whiteList
    id = id.replace(new RegExp(`${ext}$`), '')
  }

  if (path.isAbsolute(id)) {
    // absolute path
    return id
  }
  if (!path.isAbsolute(id) && /^\./.test(id)) {
    // relative path
    return path.resolve(path.dirname(importer ?? ''), id)
  }
}
