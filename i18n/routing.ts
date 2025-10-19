import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fa', 'en'],
  defaultLocale: 'fa',
  pathnames: {
    '/': '/',
    '/users': '/users',
    '/users/create': '/users/create',
  },
});

export type Locale = (typeof routing.locales)[number];

export type Pathname = keyof (typeof routing)['pathnames'];
