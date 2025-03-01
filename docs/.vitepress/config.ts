import { basename } from 'node:path'
import { defineConfig, type DefaultTheme } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'

import { head, nav, sidebar } from './configs'

const APP_BASE_PATH = basename(process.env.GITHUB_REPOSITORY || '')


export default defineConfig({
  outDir: '../dist',
  // base: '',
  base: '/docs/',

  lang: 'zh-CN',
  title: '工业互联网标识解析',
  description: '在线文档',
  head,

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,
    search: {
      // provider: 'local'
      provider: 'algolia',
      options: {
        appId: 'LT9FZP94E3',
        apiKey: 'ec03c2f23124c12def26fc9356ee27a7',
        indexName: 'snms-teleinfo'
      }
  },
  // },

    logo: '/logo.png',

    nav,
    sidebar,
    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '本页目录',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/id-pointer/id-pointer-sdk' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-2022 teleinfo.cn',
    },

    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新',

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
  },

  vite: {
    plugins: [MarkdownPreview()],
  },
})
