'use client';

import type { ReactNode } from 'react';
import { cameraStatusStyles, type CameraStatus } from './status';

export type CameraDetailItem = {
  label: string;
  value: string;
};

export type CameraCardProps = {
  name: string;
  status: CameraStatus;
  statusLabel: string;
  detailItems: CameraDetailItem[];
  trailingContent?: ReactNode;
};

export default function CameraCard({
  name,
  status,
  statusLabel,
  detailItems,
  trailingContent,
}: CameraCardProps) {
  const statusStyle = cameraStatusStyles[status];

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-soft card-gradient px-4 py-3 text-right shadow-app transition hover:border-strong hover:shadow-app-strong">
      <header className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold text-primary">{name}</h3>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle.badge}`}
        >
          <span className={`h-2.5 w-2.5 rounded-full ${statusStyle.dot}`} />
          {statusLabel}
        </span>
      </header>

      <dl className="grid grid-cols-2 gap-1 text-xs text-muted">
        {detailItems.map((item) => (
          <div key={item.label} className="flex flex-col items-end">
            <dt className="font-medium text-secondary">{item.label}</dt>
            <dd className="truncate text-muted">{item.value}</dd>
          </div>
        ))}
      </dl>

      {trailingContent ? (
        <footer className="flex justify-end gap-2 pt-1">{trailingContent}</footer>
      ) : null}
    </article>
  );
}
