// Alert Details Dialog - Shows full breakdown of alert configuration
// Displays all selected companies, levels, and categories

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, GraduationCap, Briefcase, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { UserAlert } from '@/hooks/useAlerts';

interface AlertDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  alert: UserAlert | null;
  onEdit: (alertId: string) => void;
}

const AlertDetailsDialog = ({
  isOpen,
  onOpenChange,
  alert,
  onEdit,
}: AlertDetailsDialogProps) => {
  if (!alert) return null;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy, HH:mm', { locale: pl });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5); // Extract HH:mm from HH:mm:ss
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl">{alert.alert_name}</span>
            <Badge
              variant={alert.is_active ? 'default' : 'secondary'}
              className={
                alert.is_active
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-400 hover:bg-gray-500'
              }
            >
              {alert.is_active ? 'Aktywny' : 'Nieaktywny'}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Powiadomienia codziennie o {formatTime(alert.notification_time)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Companies Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center text-foreground">
              <Building2 className="w-5 h-5 mr-2 text-purple-600" />
              Firmy ({alert.selected_companies.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {alert.selected_companies.map((company) => (
                <Badge key={company} variant="outline" className="text-sm">
                  {company}
                </Badge>
              ))}
            </div>
          </div>

          {/* Experience Levels Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center text-foreground">
              <GraduationCap className="w-5 h-5 mr-2 text-yellow-600" />
              Poziomy doświadczenia ({alert.selected_levels.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {alert.selected_levels.map((level) => (
                <Badge key={level} variant="outline" className="text-sm">
                  {level}
                </Badge>
              ))}
            </div>
          </div>

          {/* Job Categories Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center text-foreground">
              <Briefcase className="w-5 h-5 mr-2 text-green-600" />
              Kategorie stanowisk ({alert.selected_categories.length})
            </h3>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {alert.selected_categories.map((category) => (
                <Badge key={category} variant="outline" className="text-sm">
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="border-t pt-4 text-sm text-muted-foreground space-y-1">
            <p>
              <strong>Utworzono:</strong> {formatDate(alert.created_at)}
            </p>
            <p>
              <strong>Ostatnia aktualizacja:</strong> {formatDate(alert.updated_at)}
            </p>
            {alert.last_sent_at && (
              <p>
                <strong>Ostatnie powiadomienie:</strong> {formatDate(alert.last_sent_at)}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Zamknij
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
              onEdit(alert.id);
            }}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edytuj Alert
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDetailsDialog;
