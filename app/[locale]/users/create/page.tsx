import UserCreateForm from '@/components/users/UserCreateForm';
import { getTranslations } from 'next-intl/server';

export default async function CreateUserPage() {
  const t = await getTranslations('UsersCreatePage');

  return (
    <div className="p-6">
      <div className="mx-auto w-full max-w-4xl">
        <section className="rounded-2xl border border-soft bg-surface p-6 shadow-app transition">
          <header className="border-b border-soft pb-4">
            <p className="text-xs uppercase tracking-wider text-muted">{t('breadcrumb')}</p>
            <h1 className="mt-2 text-2xl font-semibold text-primary">{t('title')}</h1>
            <p className="mt-1 text-sm text-secondary">{t('subtitle')}</p>
          </header>
          <div className="mt-6">
            <UserCreateForm />
          </div>
        </section>
      </div>
    </div>
  );
}
