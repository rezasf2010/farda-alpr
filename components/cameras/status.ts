export type CameraStatus = 'active' | 'inactive' | 'maintenance';

export const cameraStatusStyles: Record<
  CameraStatus,
  {
    badge: string;
    dot: string;
  }
> = {
  active: {
    badge: 'status-chip status-chip-active',
    dot: 'status-chip-dot status-chip-dot-active',
  },
  inactive: {
    badge: 'status-chip status-chip-inactive',
    dot: 'status-chip-dot status-chip-dot-inactive',
  },
  maintenance: {
    badge: 'status-chip status-chip-maintenance',
    dot: 'status-chip-dot status-chip-dot-maintenance',
  },
};
