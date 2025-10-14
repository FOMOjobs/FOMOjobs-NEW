// Delete Alert Confirmation Dialog
// Shows confirmation before permanently deleting an alert

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface DeleteAlertDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  alertName: string;
  lastSent: string | null;
  onConfirmDelete: () => Promise<void>;
}

const DeleteAlertDialog = ({
  isOpen,
  onOpenChange,
  alertName,
  lastSent,
  onConfirmDelete,
}: DeleteAlertDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirmDelete();
      onOpenChange(false);
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: pl });
    } catch {
      return dateString;
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Czy na pewno chcesz usunąć ten alert?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Alert <span className="font-semibold text-foreground">"{alertName}"</span> zostanie
              trwale usunięty. Tej operacji nie można cofnąć.
            </p>
            {lastSent && (
              <p className="text-sm">
                Ten alert był ostatnio aktywny {formatDate(lastSent)}.
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Anuluj</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Usuwanie...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Usuń Alert
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
