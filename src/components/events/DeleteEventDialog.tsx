import React from 'react';
import type { CalendarEvent } from '../../types/event';
import { ConfirmDialog } from '../common/ConfirmDialog';

interface DeleteEventDialogProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteEventDialog: React.FC<DeleteEventDialogProps> = ({
  event,
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="¿Eliminar este evento?"
      description={`¿Estás seguro de que deseas eliminar "${event?.title || 'este evento'}"? Esta acción no se puede deshacer y se borrará permanentemente de tu navegador.`}
      confirmText="Eliminar evento"
      cancelText="Cancelar"
      variant="danger"
    />
  );
};
