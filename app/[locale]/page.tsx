import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <div className="flex min-h-screen flex-col justify-center text-center">
      <h1 className="text-6xl font-bold">{t('title')}</h1>
    </div>
  );
}
