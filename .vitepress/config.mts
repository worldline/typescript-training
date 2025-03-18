import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/typescript-training/',
  title: "TypeScript Training",
  description: "Introduction to TypeScript language",
  head: [['link', { rel: 'icon', href: '/favicon-32x32.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      {
        text: 'Preamble',
        link: '/preamble'
      },
      {
        text: 'Getting started',
        link: '/getting-started'
      },
      {
        text: 'Basic types',
        link: '/basic-types'
      },
      {
        text: 'Manipulating types',
        link: '/manipulating-types'
      },
      {
        text: 'Template literal types',
        link: '/template-literal-types'
      },
      {
        text: 'Generics',
        link: '/generics'
      },
      {
        text: "To go deeper",
        link: '/to-go-deeper'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
