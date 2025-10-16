import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fa', 'en'],
  defaultLocale: 'fa',
  pathnames: {
    '/': '/',
    '/users': '/users',
  },
});

export type Locale = (typeof routing.locales)[number];

export type Pathname = keyof (typeof routing)['pathnames'];
