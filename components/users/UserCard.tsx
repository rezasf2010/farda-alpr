'use client';

import type { ReactNode } from 'react';

type UserCardStatus = 'online' | 'offline' | 'idle';

type UserCardProps = {
  avatarLabel: string;
  name: string;
  username: string;
  role: string;
  status: UserCardStatus;
  statusLabel: string;
  lastActiveLabel: string;
  trailingContent?: ReactNode;
};

const statusStyles: Record<UserCardStatus, string> = {
  online: 'bg-emerald-400',
  offline: 'bg-slate-500',
  idle: 'bg-amber-400',
};

export default function UserCard({
  avatarLabel,
  name,
  username,
  role,
  status,
  statusLabel,
  lastActiveLabel,
  trailingContent,
}: UserCardProps) {
  return (
    <article className="flex flex-col items-stretch gap-4 rounded-xl border border-soft card-gradient px-4 py-3 shadow-app transition hover:border-strong hover:shadow-app-strong xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-1 items-center gap-3 overflow-hidden">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-500/40 bg-indigo-500/10 text-base font-semibold uppercase tracking-wide text-primary">
          {avatarLabel}
        </div>
        <div className="min-w-0 text-right">
          <p className="truncate text-sm font-semibold text-primary">{name}</p>
          <p className="truncate text-xs text-muted">{username}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 text-xs xl:flex-row xl:flex-wrap xl:items-center xl:justify-end xl:gap-4">
        <span className="chip-soft inline-flex items-center rounded-full px-3 py-1 font-medium whitespace-nowrap">
          {role}
        </span>

        <div className="flex items-end gap-2 text-right xl:flex-row xl:items-center xl:gap-3">
          <span className="flex items-center gap-2 whitespace-nowrap text-secondary">
            <span className={`h-2.5 w-2.5 rounded-full ${statusStyles[status]}`} />
            {statusLabel}
          </span>
          <span className="whitespace-nowrap text-muted">{lastActiveLabel}</span>
        </div>
        {trailingContent ? <div className="pt-1 xl:pt-0">{trailingContent}</div> : null}
      </div>
    </article>
  );
}
