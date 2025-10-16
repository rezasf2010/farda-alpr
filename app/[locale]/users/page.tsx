import UserCard from '@/components/users/UserCard';
import UserActions from '@/components/users/UserActions';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { getLocale, getTranslations } from 'next-intl/server';

type UserStatus = 'online' | 'offline' | 'idle';
type RelativeTimeUnit = 'minutes' | 'hours';

type UserRecord = {
  id: string;
  name: Record<'fa' | 'en', string>;
  username: string;
  role: 'admin' | 'operator' | 'viewer';
  status: UserStatus;
  lastActive: {
    unit: RelativeTimeUnit;
    count: number;
  };
};

const sampleUsers: UserRecord[] = [
  {
    id: '1',
    name: { fa: 'علی رضایی', en: 'Ali Rezaei' },
    username: 'ali.rezaei',
    role: 'admin',
    status: 'online',
    lastActive: {
      unit: 'minutes',
      count: 3,
    },
  },
  {
    id: '2',
    name: { fa: 'سارا محسنی', en: 'Sara Mohseni' },
    username: 's.mohseni',
    role: 'operator',
    status: 'idle',
    lastActive: {
      unit: 'minutes',
      count: 18,
    },
  },
  {
    id: '3',
    name: { fa: 'احسان لطفی', en: 'Ehsan Lotfi' },
    username: 'e.lotfi',
    role: 'viewer',
    status: 'offline',
    lastActive: {
      unit: 'hours',
      count: 4,
    },
  },
  {
    id: '4',
    name: { fa: 'مهسا غلامی', en: 'Mahsa Gholami' },
    username: 'm.gholami',
    role: 'operator',
    status: 'online',
    lastActive: {
      unit: 'minutes',
      count: 1,
    },
  },
];

export default async function UsersPage() {
  const t = await getTranslations('UsersPage');
  const locale = await getLocale();

  const formatRelativeTime = (unit: RelativeTimeUnit, count: number) =>
    t(`relative.${unit}`, { count });

  const formatName = (entry: UserRecord['name']) =>
    (locale === 'fa' ? entry.fa : entry.en) ?? entry.en;

  const avatarLabel = (name: string) =>
    name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();

  return (
    <div className="p-6">
      <section className="mx-auto w-full rounded-2xl border border-white/10 bg-panel p-6 lg:p-4 xl:p-6 shadow-[0_18px_40px_rgba(5,20,45,0.55)] lg:w-1/2">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">{t('management.title')}</h1>
            <p className="text-sm text-white/60">{t('management.subtitle')}</p>
          </div>
          <div className="flex flex-col items-end gap-3 text-xs text-white/70 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                {t('status.online')}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                {t('status.idle')}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
                {t('status.offline')}
              </span>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <PersonAddAltOutlinedIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
              {t('actions.create')}
            </button>
          </div>
        </header>
        <div className="mt-5 space-y-3">
          {sampleUsers.map((user) => (
            <UserCard
              key={user.id}
              avatarLabel={avatarLabel(formatName(user.name))}
              name={formatName(user.name)}
              username={user.username}
              role={t(`roles.${user.role}`)}
              status={user.status}
              statusLabel={t(`status.${user.status}`)}
              lastActiveLabel={formatRelativeTime(user.lastActive.unit, user.lastActive.count)}
              trailingContent={
                <UserActions
                  userId={user.id}
                  editLabel={t('actions.edit')}
                  removeLabel={t('actions.remove')}
                />
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
