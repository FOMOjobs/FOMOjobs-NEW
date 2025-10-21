// Alert Card Component - Individual alert display in grid
// Shows alert summary with toggle, edit, view details, and delete actions

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Building2, GraduationCap, Briefcase, Clock, Eye, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { UserAlert } from '@/hooks/useAlerts';

interface AlertCardProps {
  alert: UserAlert;
  onToggleStatus: (alertId: number) => void;
  onViewDetails: (alert: UserAlert) => void;
  onEdit: (alertId: number) => void;
  onDelete: (alertId: number, alertName: string, lastSent: string | null) => void;
}

const AlertCard = ({
  alert,
  onToggleStatus,
  onViewDetails,
  onEdit,
  onDelete,
}: AlertCardProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: pl });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5); // Extract HH:mm from HH:mm:ss
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold">{alert.alert_name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1 flex items-center">
              <Clock className="w-3 h-3 inline mr-1" />
              Powiadomienia o {formatTime(alert.alert_time)}
            </p>
          </div>
          <Switch
            checked={alert.is_active}
            onCheckedChange={() => onToggleStatus(alert.id)}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
            <Building2 className="w-4 h-4 mx-auto mb-1 text-purple-600 dark:text-purple-400" />
            <p className="font-semibold text-foreground">{alert.companies.length}</p>
            <p className="text-xs text-muted-foreground">firm</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded p-2">
            <GraduationCap className="w-4 h-4 mx-auto mb-1 text-yellow-600 dark:text-yellow-400" />
            <p className="font-semibold text-foreground">{alert.experience_levels.length}</p>
            <p className="text-xs text-muted-foreground">poziomów</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
            <Briefcase className="w-4 h-4 mx-auto mb-1 text-green-600 dark:text-green-400" />
            <p className="font-semibold text-foreground">{alert.job_categories.length}</p>
            <p className="text-xs text-muted-foreground">kategorii</p>
          </div>
        </div>

        {/* Preview (first 3 items of each) */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p className="truncate">
            <strong className="text-foreground">Firmy:</strong>{' '}
            {alert.companies.slice(0, 3).join(', ')}
            {alert.companies.length > 3 &&
              ` +${alert.companies.length - 3} więcej`}
          </p>
          <p className="truncate">
            <strong className="text-foreground">Poziomy:</strong>{' '}
            {alert.experience_levels.slice(0, 2).join(', ')}
            {alert.experience_levels.length > 2 && ` +${alert.experience_levels.length - 2}`}
          </p>
        </div>

        {/* Last sent */}
        {alert.last_sent_at && (
          <p className="text-xs text-muted-foreground">
            Ostatnio wysłano: {formatDate(alert.last_sent_at)}
          </p>
        )}

        {/* Status Badge */}
        <Badge
          variant={alert.is_active ? 'default' : 'secondary'}
          className={
            alert.is_active
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-400 hover:bg-gray-500 text-white'
          }
        >
          {alert.is_active ? 'Aktywny' : 'Nieaktywny'}
        </Badge>
      </CardContent>

      <CardFooter className="gap-2 flex-wrap">
        <Button
          variant="outline"
          className="flex-1 min-w-[120px]"
          onClick={() => onViewDetails(alert)}
        >
          <Eye className="w-4 h-4 mr-1" />
          Szczegóły
        </Button>
        <Button
          variant="outline"
          className="flex-1 min-w-[120px]"
          onClick={() => onEdit(alert.id)}
        >
          <Edit className="w-4 h-4 mr-1" />
          Edytuj
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(alert.id, alert.alert_name, alert.last_sent_at)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AlertCard;
