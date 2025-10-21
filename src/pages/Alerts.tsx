// Alerts Management Page - View, edit, delete, and toggle user alerts
// Main dashboard for managing all saved job alerts

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import FOMOJobsNavbar from '@/components/FOMOJobsNavbar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, AlertCircle, RefreshCcw } from 'lucide-react';
import { useAlerts, UserAlert } from '@/hooks/useAlerts';
import AlertCard from '@/components/alerts/AlertCard';
import AlertDetailsDialog from '@/components/alerts/AlertDetailsDialog';
import DeleteAlertDialog from '@/components/alerts/DeleteAlertDialog';
import EmptyState from '@/components/alerts/EmptyState';

type TabValue = 'all' | 'active' | 'inactive';

const Alerts = () => {
  const navigate = useNavigate();
  const { alerts, loading, error, toggleAlertStatus, deleteAlert, fetchAlerts } = useAlerts();

  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const [selectedAlert, setSelectedAlert] = useState<UserAlert | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
    lastSent: string | null;
  } | null>(null);

  // Filter alerts by tab
  const filteredAlerts = alerts.filter((alert) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return alert.is_active;
    if (activeTab === 'inactive') return !alert.is_active;
    return true;
  });

  const totalCount = alerts.length;
  const activeCount = alerts.filter((a) => a.is_active).length;
  const inactiveCount = alerts.filter((a) => !a.is_active).length;

  // Handlers
  const handleViewDetails = (alert: UserAlert) => {
    setSelectedAlert(alert);
    setIsDetailsOpen(true);
  };

  const handleEdit = (alertId: number) => {
    navigate(`/alerts/edit/${alertId}`);
  };

  const handleDeleteClick = (alertId: number, alertName: string, lastSent: string | null) => {
    setDeleteTarget({ id: alertId, name: alertName, lastSent });
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      await deleteAlert(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Moje Alerty - FOMOjobs</title>
        <meta
          name="description"
          content="Zarządzaj swoimi alertami pracy. Przeglądaj, edytuj i dostosowuj powiadomienia o ofertach."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <FOMOJobsNavbar />

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-yellow-400 text-white py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Moje Alerty</h1>
                <p className="text-white/90 mt-2">Zarządzaj swoimi alertami pracy</p>
              </div>
              <Button
                onClick={() => navigate('/alerts/create')}
                className="bg-yellow-500 hover:bg-yellow-600 text-purple-900 font-semibold shadow-lg"
                size="lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nowy Alert
              </Button>
            </div>
          </div>
        </div>

        {/* Filters/Tabs */}
        {!loading && alerts.length > 0 && (
          <div className="container mx-auto px-4 py-4">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)}>
              <TabsList className="bg-white dark:bg-gray-800 shadow-sm">
                <TabsTrigger value="all">Wszystkie ({totalCount})</TabsTrigger>
                <TabsTrigger value="active">Aktywne ({activeCount})</TabsTrigger>
                <TabsTrigger value="inactive">Nieaktywne ({inactiveCount})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* Alerts Grid */}
        <div className="container mx-auto px-4 pb-12">
          {loading ? (
            // Loading State
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 w-10" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Error State
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Nie udało się wczytać alertów
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <Button onClick={fetchAlerts}>
                <RefreshCcw className="w-4 h-4 mr-2" />
                Spróbuj ponownie
              </Button>
            </div>
          ) : alerts.length === 0 ? (
            // Empty State
            <EmptyState />
          ) : filteredAlerts.length === 0 ? (
            // Empty Filter Result
            <div className="text-center py-16">
              <p className="text-gray-600 dark:text-gray-400">
                Brak alertów w tej kategorii
              </p>
            </div>
          ) : (
            // Alerts Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onToggleStatus={toggleAlertStatus}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Details Dialog */}
      <AlertDetailsDialog
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        alert={selectedAlert}
        onEdit={handleEdit}
      />

      {/* Delete Confirmation Dialog */}
      {deleteTarget && (
        <DeleteAlertDialog
          isOpen={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          alertName={deleteTarget.name}
          lastSent={deleteTarget.lastSent}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default Alerts;
