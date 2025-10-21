/**
 * CV List Page - Multi-CV Management
 *
 * Browse, create, rename, duplicate, and delete saved CVs
 * Load any CV into the editor with one click
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  FileText,
  Edit3,
  Copy,
  Trash2,
  Download,
  Eye,
  Clock,
  MoreVertical,
  Loader2,
  Save,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import FOMOJobsNavbar from '@/components/FOMOJobsNavbar';
import FOMOJobsFooter from '@/components/landing/FOMOJobsFooter';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import { cvCloudService, SavedCV } from '@/services/cvCloudService';
import { useCVStore } from '@/stores/cvStore';

const CVList = () => {
  const navigate = useNavigate();
  const {
    savedCVs,
    isCloudLoading,
    fetchSavedCVs,
    saveCurrentCV,
    loadSavedCV,
    renameSavedCV,
    duplicateSavedCV,
    deleteSavedCV,
    cvData
  } = useCVStore();

  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cvToDelete, setCvToDelete] = useState<SavedCV | null>(null);

  // Rename dialog
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [cvToRename, setCvToRename] = useState<SavedCV | null>(null);
  const [newName, setNewName] = useState('');

  // Create dialog
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newCVName, setNewCVName] = useState('');

  // Load CVs on mount
  useEffect(() => {
    fetchSavedCVs();
  }, [fetchSavedCVs]);

  const handleCreateCV = async () => {
    if (!newCVName.trim()) {
      toast.error('Podaj nazwę CV');
      return;
    }

    try {
      setActionLoading('create');
      await saveCurrentCV(newCVName.trim());
      setCreateDialogOpen(false);
      setNewCVName('');
      toast.success(`CV "${newCVName}" utworzone!`);
    } catch (error) {
      console.error('Failed to create CV:', error);
      toast.error('Nie udało się utworzyć CV');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRenameCV = async () => {
    if (!cvToRename || !newName.trim()) {
      toast.error('Podaj nową nazwę');
      return;
    }

    try {
      setActionLoading(cvToRename.id);
      await renameSavedCV(cvToRename.id, newName.trim());
      setRenameDialogOpen(false);
      setCvToRename(null);
      setNewName('');
      toast.success('Nazwa zmieniona!');
    } catch (error) {
      console.error('Failed to rename CV:', error);
      toast.error('Nie udało się zmienić nazwy');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDuplicateCV = async (cv: SavedCV) => {
    try {
      setActionLoading(cv.id);
      await duplicateSavedCV(cv.id);
      toast.success(`Skopiowano CV "${cv.name}"`);
    } catch (error) {
      console.error('Failed to duplicate CV:', error);
      toast.error('Nie udało się skopiować CV');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteCV = async () => {
    if (!cvToDelete) return;

    try {
      setActionLoading(cvToDelete.id);
      await deleteSavedCV(cvToDelete.id);
      setDeleteDialogOpen(false);
      setCvToDelete(null);
      toast.success('CV usunięte');
    } catch (error) {
      console.error('Failed to delete CV:', error);
      toast.error('Nie udało się usunąć CV');
    } finally {
      setActionLoading(null);
    }
  };

  const handleLoadCV = async (cv: SavedCV) => {
    try {
      await loadSavedCV(cv.id);
      toast.success(`Wczytano CV "${cv.name}"`);
      navigate('/cv-creator');
    } catch (error) {
      console.error('Failed to load CV:', error);
      toast.error('Nie udało się wczytać CV');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Przed chwilą';
    if (diffMins < 60) return `${diffMins} min temu`;
    if (diffHours < 24) return `${diffHours} godz. temu`;
    if (diffDays < 7) return `${diffDays} dni temu`;

    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <>
      <Helmet>
        <title>Moje CV - Zarządzaj swoimi CV | FOMOjobs</title>
        <meta
          name="description"
          content="Przeglądaj, edytuj i zarządzaj wszystkimi swoimi CV w jednym miejscu."
        />
      </Helmet>

      <FOMOJobsNavbar />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden pt-16">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 dark:bg-yellow-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 dark:bg-pink-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
                  Moje CV
                </h1>
                {savedCVs.length > 0 && (
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold">
                    {savedCVs.length}
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Zarządzaj swoimi wersjami CV • Wszystkie zapisane w chmurze
              </p>
            </div>

            <Button
              size="lg"
              onClick={() => setCreateDialogOpen(true)}
              className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nowe CV
            </Button>
          </div>

          {/* Loading State */}
          {isCloudLoading && savedCVs.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
          )}

          {/* Empty State */}
          {!isCloudLoading && savedCVs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-semibold mb-2">Nie masz jeszcze żadnego CV</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Utwórz swoje pierwsze CV i zacznij aplikować!
              </p>
              <Button
                size="lg"
                onClick={() => setCreateDialogOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600"
              >
                <Plus className="w-5 h-5 mr-2" />
                Utwórz pierwsze CV
              </Button>
            </motion.div>
          )}

          {/* CV Grid */}
          {!isCloudLoading && savedCVs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCVs.map((cv, index) => (
                <motion.div
                  key={cv.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">{cv.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1 text-xs">
                            <Clock className="w-3 h-3" />
                            <span>Edytowano {formatDate(cv.updatedAt)}</span>
                          </CardDescription>
                        </div>

                        {/* Actions Dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              disabled={actionLoading === cv.id}
                            >
                              {actionLoading === cv.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <MoreVertical className="w-4 h-4" />
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setCvToRename(cv);
                                setNewName(cv.name);
                                setRenameDialogOpen(true);
                              }}
                            >
                              <Edit3 className="w-4 h-4 mr-2" />
                              Zmień nazwę
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicateCV(cv)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplikuj
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setCvToDelete(cv);
                                setDeleteDialogOpen(true);
                              }}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Usuń
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>

                    <CardContent className="pb-3">
                      {/* CV Preview Info */}
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>
                            {cv.cvData.personal?.fullName || ''}
                          </span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-3 border-t flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLoadCV(cv)}
                        className="flex-1"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edytuj
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <FOMOJobsFooter />

      {/* Create CV Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Utwórz nowe CV</DialogTitle>
            <DialogDescription>
              Zapisz bieżące CV pod nową nazwą. Możesz później edytować i zarządzać nim.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cv-name">Nazwa CV</Label>
              <Input
                id="cv-name"
                placeholder="np. Frontend Developer - 2024"
                value={newCVName}
                onChange={(e) => setNewCVName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newCVName.trim()) {
                    handleCreateCV();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Anuluj
            </Button>
            <Button
              onClick={handleCreateCV}
              disabled={!newCVName.trim() || actionLoading === 'create'}
              className="bg-gradient-to-r from-purple-600 to-yellow-500"
            >
              {actionLoading === 'create' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Zapisywanie...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Zapisz
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename CV Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Zmień nazwę CV</DialogTitle>
            <DialogDescription>Podaj nową nazwę dla tego CV.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-name">Nowa nazwa</Label>
              <Input
                id="new-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newName.trim()) {
                    handleRenameCV();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
              Anuluj
            </Button>
            <Button
              onClick={handleRenameCV}
              disabled={!newName.trim() || actionLoading !== null}
            >
              {actionLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Zapisywanie...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Zapisz
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete CV Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy na pewno chcesz usunąć to CV?</AlertDialogTitle>
            <AlertDialogDescription>
              Ta operacja jest nieodwracalna. CV "{cvToDelete?.name}" zostanie trwale usunięte.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCV}
              className="bg-red-600 hover:bg-red-700"
            >
              {actionLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Usuwanie...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Usuń
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CVList;
