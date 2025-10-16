'use client';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useCallback } from 'react';

type CameraActionsProps = {
  cameraId: string;
  editLabel: string;
  removeLabel: string;
  viewLabel: string;
  onEdit?: (cameraId: string) => void;
  onRemove?: (cameraId: string) => void;
  onView?: (cameraId: string) => void;
};

export default function CameraActions({
  cameraId,
  editLabel,
  removeLabel,
  viewLabel,
  onEdit,
  onRemove,
  onView,
}: CameraActionsProps) {
  const handleEdit = useCallback(() => {
    if (onEdit) {
      onEdit(cameraId);
      return;
    }
    console.info('Edit camera', cameraId);
  }, [cameraId, onEdit]);

  const handleRemove = useCallback(() => {
    if (onRemove) {
      onRemove(cameraId);
      return;
    }
    console.info('Remove camera', cameraId);
  }, [cameraId, onRemove]);

  const handleView = useCallback(() => {
    if (onView) {
      onView(cameraId);
      return;
    }
    console.info('View stream for camera', cameraId);
  }, [cameraId, onView]);

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <button
        type="button"
        onClick={handleEdit}
        className="inline-flex items-center gap-1 rounded-lg btn-tonal-primary px-3 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-2 focus:ring-offset-app"
      >
        <EditOutlinedIcon sx={{ fontSize: { xs: 16, xl: 18 } }} />
        {editLabel}
      </button>
      <button
        type="button"
        onClick={handleRemove}
        className="inline-flex items-center gap-1 rounded-lg btn-tonal-danger px-3 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-rose-400/60 focus:ring-offset-2 focus:ring-offset-app"
      >
        <DeleteOutlineOutlinedIcon sx={{ fontSize: { xs: 16, xl: 18 } }} />
        {removeLabel}
      </button>
      <button
        type="button"
        onClick={handleView}
        className="inline-flex items-center gap-1 rounded-lg btn-tonal-info px-3 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-app"
      >
        <VisibilityOutlinedIcon sx={{ fontSize: { xs: 16, xl: 18 } }} />
        {viewLabel}
      </button>
    </div>
  );
}
