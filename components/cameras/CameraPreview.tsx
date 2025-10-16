import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { cameraStatusStyles, type CameraStatus } from './status';

type CameraPreviewProps = {
  name: string;
  number: string;
  status: CameraStatus;
  statusLabel: string;
};

export default function CameraPreview({ name, number, status, statusLabel }: CameraPreviewProps) {
  const statusStyle = cameraStatusStyles[status];

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-soft card-gradient p-4 text-right shadow-app transition hover:border-strong hover:shadow-app-strong">
      <div className="flex items-center justify-center rounded-lg border border-soft bg-surface-muted py-8 text-secondary">
        <VideocamOutlinedIcon sx={{ fontSize: { xs: 48, lg: 56 } }} />
      </div>
      <div className="space-y-1 text-xs text-secondary">
        <p className="truncate text-sm font-semibold text-primary">{name}</p>
        <div className="flex items-center justify-between text-xs">
          <span className="truncate text-muted">{number}</span>
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-semibold ${statusStyle.badge}`}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${statusStyle.dot}`} />
            {statusLabel}
          </span>
        </div>
      </div>
    </article>
  );
}
