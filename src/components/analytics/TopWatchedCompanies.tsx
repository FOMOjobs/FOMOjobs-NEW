import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users } from 'lucide-react';

interface TopWatchedCompany {
  rank: number;
  company: string;
  subscribers: number;
}

const MOCK_TOP_WATCHED: TopWatchedCompany[] = [
  { rank: 1, company: 'Capgemini Polska', subscribers: 89 },
  { rank: 2, company: 'GlobalLogic Poland', subscribers: 72 },
  { rank: 3, company: 'Comarch S.A.', subscribers: 67 },
  { rank: 4, company: 'State Street', subscribers: 61 },
  { rank: 5, company: 'Motorola Solutions', subscribers: 54 },
  { rank: 6, company: 'Sabre Polska', subscribers: 48 },
];

const getMedalEmoji = (rank: number): string => {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return '';
  }
};

const getRankBadgeColor = (rank: number): string => {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-0';
    case 2:
      return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 border-0';
    case 3:
      return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-0';
    default:
      return 'bg-purple-100 text-purple-700 border-purple-300';
  }
};

export default function TopWatchedCompanies() {
  return (
    <Card className="border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800">
      <div className="p-6 bg-gradient-to-r from-purple-100 to-yellow-100 dark:from-purple-900/30 dark:to-yellow-900/30 border-b border-purple-200 dark:border-purple-700">
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            🏆 Najczęściej Śledzone Firmy
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Firmy z największą liczbą alertów użytkowników
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {MOCK_TOP_WATCHED.map((item) => (
            <div
              key={item.rank}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors border border-transparent hover:border-purple-200 dark:hover:border-purple-700"
            >
              <div className="flex items-center gap-3">
                <Badge className={getRankBadgeColor(item.rank)}>
                  #{item.rank}
                </Badge>
                {item.rank <= 3 && (
                  <span className="text-2xl" title={`Rank ${item.rank}`}>
                    {getMedalEmoji(item.rank)}
                  </span>
                )}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {item.company}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  {item.subscribers} subskrybentów
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
