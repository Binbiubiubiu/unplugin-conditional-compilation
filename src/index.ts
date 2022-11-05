import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import type { Options } from './types'
import { resolveMainFilePath, resolveSrcRequest } from './core'
import { SCRIPT_EXT } from './core/constants'

export default createUnplugin<Options | undefined>((options = {}) => {
  const {
    include,
    exclude,
    extensions = [],
    envVar = '',
    env = process.env?.[envVar] ?? '',
    cwd,
  } = options

  const filter = createFilter(include, exclude, { resolve: cwd })
  const EnvFilePattern = new RegExp(
    `.+\\.${env}(${extensions.map(ext => `\\${ext}`).join('|')})$`,
  )

  const resolvedIds = new Set()

  return {
    name: 'unplugin-conditional-compilation',
    enforce: 'pre',
    async resolveId(id, importer) {
      // prevent circle loop
      if (!env || resolvedIds.has(id))
        return

      const srcRequest = resolveSrcRequest(id, importer)
      if (!srcRequest)
        return

      if (/node_modules/.test(srcRequest) || !filter(srcRequest))
        return

      const result = resolveMainFilePath(
        srcRequest,
        options?.extensions ?? SCRIPT_EXT,
        env,
      )
      resolvedIds.add(result)
      return result
    },
    async transform() {
      return null
    },
    vite: {
      configureServer(server) {
        if (!env)
          return
        const handler = (file: string) => {
          if (EnvFilePattern.test(file))
            server.moduleGraph.invalidateAll()
        }
        server.watcher.on('add', handler)
        server.watcher.on('unlink', handler)
      },
    },
  }
})
