import { createUnplugin } from 'unplugin'
import { createFilter, normalizePath } from '@rollup/pluginutils'
import colors from 'picocolors'
import type { Options } from './types'
import { getShortName, resolveMainFilePath, resolveSrcRequest } from './core'
import { SCRIPT_EXT } from './core/constants'

export default createUnplugin<Options | undefined>((options = {}) => {
  const {
    include,
    exclude,
    extensions = SCRIPT_EXT,
    envVar = '',
    env = process.env?.[envVar] ?? '',
    cwd,
  } = options

  const filter = createFilter(include, exclude, { resolve: cwd })
  const EnvFilePattern = new RegExp(
    `.+\\.${env}(${extensions.map(ext => `\\${ext}`).join('|')})$`,
  )

  const resolvedIds = new Set()
  let htmlEntrySet = new Set()
  let IS_WEBPACK = false

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
        extensions,
        env,
      )
      resolvedIds.add(result)
      return result
    },
    transformInclude(id) {
      if (IS_WEBPACK)
        return !htmlEntrySet.has(id)

      return true
    },
    transform() {
      return null
    },
    webpack(compiler) {
      htmlEntrySet = new Set()
      IS_WEBPACK = true
      import('html-webpack-plugin').then((m) => {
        const classType = m.default ?? m
        compiler.options.plugins.filter((p) => {
          return p instanceof classType
        }).forEach((it: any) => {
          const template = it?.userOptions?.template ?? it?.options?.template
          if (template)
            htmlEntrySet.add(template)
        })
      }).catch(() => {})

      // const devServer = compiler.options.devServer as DevServerConfiguration
      // if (devServer) {
      //   //
      //   const onListening = devServer.onListening
      //   devServer.onListening = (server) => {
      //     server.invalidate()
      //     const clients = server.webSocketServer?.clients
      //     if (clients)
      //       server.sendMessage(clients, 'liveReload')

      //     onListening?.(server)
      //   }
      // }
    },
    vite: {
      configureServer(server) {
        if (!env)
          return
        const handle = (file: string) => {
          file = normalizePath(file)
          const { config, moduleGraph, ws } = server
          const shortFile = getShortName(file, config.root)
          if (EnvFilePattern.test(file)) {
            config.logger.info(colors.green('page reload ') + colors.dim(shortFile), {
              clear: true,
              timestamp: true,
            })
            moduleGraph.invalidateAll()
            ws.send({
              type: 'full-reload',
              path: '*',
            })
          }
        }
        server.watcher.on('add', handle)
        server.watcher.on('unlink', handle)
      },
    },
  }
})
