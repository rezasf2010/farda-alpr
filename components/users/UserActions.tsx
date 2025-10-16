'use client';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useCallback } from 'react';

type UserActionsProps = {
  userId: string;
  editLabel: string;
  removeLabel: string;
  onEdit?: (userId: string) => void;
  onRemove?: (userId: string) => void;
};

export default function UserActions({
  userId,
  editLabel,
  removeLabel,
  onEdit,
  onRemove,
}: UserActionsProps) {
  const handleEdit = useCallback(() => {
    if (onEdit) {
      onEdit(userId);
      return;
    }
    console.info('Edit user', userId);
  }, [onEdit, userId]);

  const handleRemove = useCallback(() => {
    if (onRemove) {
      onRemove(userId);
      return;
    }
    console.info('Remove user', userId);
  }, [onRemove, userId]);

  return (
    <div className="flex items-center gap-1 xl:gap-2">
      <button
        type="button"
        onClick={handleEdit}
        className="inline-flex items-center gap-1 xl:gap-2 rounded-lg border border-indigo-400/30 bg-indigo-500/10 px-2 py-1 xl:px-3 xl:py-2 text-xs font-semibold text-indigo-100 transition hover:bg-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        <EditOutlinedIcon sx={{ fontSize: { xs: 14, xl: 18 } }} />
        {editLabel}
      </button>
      <button
        type="button"
        onClick={handleRemove}
        className="inline-flex items-center gap-1 xl:gap-2 rounded-lg border border-rose-400/30 bg-rose-500/10 px-2 py-1 xl:px-3 xl:py-2 text-xs font-semibold text-rose-100 transition hover:bg-rose-500/20 focus:outline-none focus:ring-2 focus:ring-rose-400/60 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        <DeleteOutlineOutlinedIcon sx={{ fontSize: { xs: 14, xl: 18 } }} />
        {removeLabel}
      </button>
    </div>
  );
}
