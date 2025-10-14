// Empty State Component - Shown when user has no alerts
// Encourages creation of first alert with benefits showcase

import { Button } from '@/components/ui/button';
import { Bell, Plus, Check, Clock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-16 px-4">
      <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <Bell className="w-12 h-12 text-purple-600 dark:text-purple-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Nie masz jeszcze żadnych alertów
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Utwórz swój pierwszy alert, aby otrzymywać powiadomienia o nowych ofertach pracy
        dopasowanych do Twoich preferencji.
      </p>
      <Button
        onClick={() => navigate('/alerts/create')}
        size="lg"
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg"
      >
        <Plus className="w-5 h-5 mr-2" />
        Stwórz pierwszy alert
      </Button>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
        <div className="text-left p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <Check className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
          <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">
            Spersonalizowane
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Wybierz firmy, poziomy i kategorie które Cię interesują
          </p>
        </div>
        <div className="text-left p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mb-2" />
          <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">
            Codziennie o stałej porze
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Otrzymuj powiadomienia kiedy Ci wygodnie
          </p>
        </div>
        <div className="text-left p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
          <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">
            Email z zestawieniem
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Wszystkie nowe oferty w jednej wiadomości
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
