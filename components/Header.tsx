'use client';

import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Header');

  return (
    <div className="flex h-14 items-center justify-center bg-sky-950">
      <h1 className="text-2xl font-extrabold">{t('title')}</h1>
    </div>
  );
}
