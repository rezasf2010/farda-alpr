import CameraActions from '@/components/cameras/CameraActions';
import CameraCard from '@/components/cameras/CameraCard';
import CameraPreview from '@/components/cameras/CameraPreview';
import { cameraStatusStyles, type CameraStatus } from '@/components/cameras/status';
import UserCard from '@/components/users/UserCard';
import UserActions from '@/components/users/UserActions';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { getLocale, getTranslations } from 'next-intl/server';

type UserStatus = 'online' | 'offline' | 'idle';
type RelativeTimeUnit = 'minutes' | 'hours';
type LocalizedText = Record<'fa' | 'en', string>;

type UserRecord = {
  id: string;
  name: LocalizedText;
  username: string;
  role: 'admin' | 'operator' | 'viewer';
  status: UserStatus;
  lastActive: {
    unit: RelativeTimeUnit;
    count: number;
  };
};

type CameraRecord = {
  id: string;
  name: LocalizedText;
  number: string;
  status: CameraStatus;
  location: LocalizedText;
  resolution: string;
  streamUrl: string;
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

const sampleCameras: CameraRecord[] = [
  {
    id: 'cam-01',
    name: { fa: 'دوربین ورودی شمالی', en: 'North Entrance Camera' },
    number: 'CAM-001',
    status: 'active',
    location: { fa: 'ورودی اصلی شمالی', en: 'North Main Entrance' },
    resolution: '1080p',
    streamUrl: 'rtsp://192.168.1.101:554/stream',
    lastActive: {
      unit: 'minutes',
      count: 2,
    },
  },
  {
    id: 'cam-02',
    name: { fa: 'دوربین پارکینگ طبقه اول', en: 'Parking Level 1' },
    number: 'CAM-002',
    status: 'inactive',
    location: { fa: 'پارکینگ شمالی', en: 'North Parking' },
    resolution: '720p',
    streamUrl: 'rtsp://192.168.1.102:554/stream',
    lastActive: {
      unit: 'hours',
      count: 6,
    },
  },
  {
    id: 'cam-03',
    name: { fa: 'دوربین انبار مرکزی', en: 'Warehouse Camera' },
    number: 'CAM-003',
    status: 'maintenance',
    location: { fa: 'انبار مرکزی', en: 'Main Warehouse' },
    resolution: '4K',
    streamUrl: 'rtsp://192.168.1.103:554/stream',
    lastActive: {
      unit: 'hours',
      count: 12,
    },
  },
  {
    id: 'cam-04',
    name: { fa: 'دوربین خروجی جنوبی', en: 'South Exit Camera' },
    number: 'CAM-004',
    status: 'active',
    location: { fa: 'خروجی جنوبی', en: 'South Exit' },
    resolution: '1080p',
    streamUrl: 'rtsp://192.168.1.104:554/stream',
    lastActive: {
      unit: 'minutes',
      count: 8,
    },
  },
];

export default async function UsersPage() {
  const t = await getTranslations('UsersPage');
  const locale = await getLocale();

  const selectLocalized = (entry: LocalizedText) =>
    (locale === 'fa' ? entry.fa : entry.en) ?? entry.en;

  const formatRelativeTime = (unit: RelativeTimeUnit, count: number) =>
    t(`relative.${unit}`, { count });

  const avatarLabel = (name: string) =>
    name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();

  const cameraStatusCounts = sampleCameras.reduce<Record<CameraStatus, number>>(
    (acc, camera) => {
      acc[camera.status] += 1;
      return acc;
    },
    {
      active: 0,
      inactive: 0,
      maintenance: 0,
    },
  );

  return (
    <div className="p-6">
      <div className="mx-auto flex w-full max-w-10xl flex-col gap-6 lg:flex-row lg:items-start">
        <section className="rounded-2xl border border-soft bg-surface p-6 shadow-app transition lg:flex-1">
          <header className="flex flex-col gap-4 border-b border-soft pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-primary">{t('management.title')}</h1>
              <p className="text-sm text-secondary">{t('management.subtitle')}</p>
            </div>
            <div className="flex flex-col items-end gap-3 text-xs text-secondary sm:flex-row sm:items-center sm:gap-4">
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
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg btn-tonal-success px-4 py-2 text-xs font-semibold transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-app"
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
                avatarLabel={avatarLabel(selectLocalized(user.name))}
                name={selectLocalized(user.name)}
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

        <div className="flex flex-col gap-6 lg:flex-1">
          <section className="rounded-2xl border border-soft bg-surface p-6 shadow-app transition">
            <header className="flex flex-col gap-4 border-b border-soft pb-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-primary">{t('cameras.title')}</h2>
                <p className="text-sm text-secondary">{t('cameras.subtitle')}</p>
              </div>
              <div className="flex flex-col justify-between gap-3 text-xs text-secondary sm:flex-row sm:items-center sm:gap-2 lg:gap-5">
                <div className="flex flex-wrap items-center justify-end gap-3">
                  {(Object.keys(cameraStatusCounts) as CameraStatus[]).map((status) => (
                    <span key={status} className="flex items-center gap-2 whitespace-nowrap">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${cameraStatusStyles[status].dot}`}
                      />
                      <span className="text-muted">
                        {t(`cameras.status.${status}`)}:{' '}
                        <span className="font-semibold text-primary">
                          {cameraStatusCounts[status]}
                        </span>
                      </span>
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg btn-tonal-info px-4 py-2 text-xs font-semibold transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-app self-end"
                >
                  <VideoCallOutlinedIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                  {t('cameras.actions.create')}
                </button>
              </div>
            </header>
            <div className="mt-5 space-y-3">
              {sampleCameras.map((camera) => (
                <CameraCard
                  key={camera.id}
                  name={selectLocalized(camera.name)}
                  status={camera.status}
                  statusLabel={t(`cameras.status.${camera.status}`)}
                  detailItems={[
                    {
                      label: t('cameras.fields.number'),
                      value: camera.number,
                    },
                    {
                      label: t('cameras.fields.location'),
                      value: selectLocalized(camera.location),
                    },
                    {
                      label: t('cameras.fields.resolution'),
                      value: camera.resolution,
                    },
                    {
                      label: t('cameras.fields.lastActive'),
                      value: formatRelativeTime(camera.lastActive.unit, camera.lastActive.count),
                    },
                  ]}
                  trailingContent={
                    <CameraActions
                      cameraId={camera.id}
                      editLabel={t('cameras.actions.edit')}
                      removeLabel={t('cameras.actions.remove')}
                      viewLabel={t('cameras.actions.view')}
                    />
                  }
                />
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-soft bg-surface p-6 shadow-app transition">
            <header className="border-b border-soft pb-5">
              <h2 className="text-xl font-semibold text-primary">{t('cameraPreview.title')}</h2>
              <p className="text-sm text-secondary">{t('cameraPreview.subtitle')}</p>
            </header>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {sampleCameras.map((camera) => (
                <CameraPreview
                  key={camera.id}
                  name={selectLocalized(camera.name)}
                  number={camera.number}
                  status={camera.status}
                  statusLabel={t(`cameras.status.${camera.status}`)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
