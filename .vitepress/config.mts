import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/typescript-training/',
  title: "TypeScript Training",
  description: "Introduction to TypeScript language",
  head: [['link', { rel: 'icon', href: '/favicon-32x32.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
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
      }
    },
    fr: {
      label: 'Français',
      lang: 'fr-FR',
      link: '/fr/',
      themeConfig: {
        nav: [
          { text: 'Accueil', link: '/fr/' }
        ],

        sidebar: [
          {
            text: 'Préambule',
            link: '/fr/preambule'
          },
          {
            text: 'Premiers pas',
            link: '/fr/premiers-pas'
          },
          {
            text: 'Types de base',
            link: '/fr/types-de-base'
          },
          {
            text: 'Manipuler les types',
            link: '/fr/manipuler-les-types'
          },
          {
            text: 'Littéraux de template',
            link: '/fr/litteraux-de-template'
          },
          {
            text: 'Génériques',
            link: '/fr/generiques'
          },
          {
            text: "Pour aller plus loin",
            link: '/fr/pour-aller-plus-loin'
          }
        ],
      }
    }
  }
})
