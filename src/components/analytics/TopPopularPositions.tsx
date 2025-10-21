import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Bell } from 'lucide-react';

interface TopPosition {
  rank: number;
  position: string;
  alerts: number;
}

const MOCK_TOP_POSITIONS: TopPosition[] = [
  { rank: 1, position: 'Senior Java Developer', alerts: 124 },
  { rank: 2, position: 'Frontend Developer (React)', alerts: 98 },
  { rank: 3, position: 'DevOps Engineer', alerts: 87 },
  { rank: 4, position: 'Product Manager', alerts: 76 },
  { rank: 5, position: 'Data Engineer', alerts: 65 },
  { rank: 6, position: 'QA Engineer', alerts: 54 },
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

export default function TopPopularPositions() {
  return (
    <Card className="border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800">
      <div className="p-6 bg-gradient-to-r from-purple-100 to-yellow-100 dark:from-purple-900/30 dark:to-yellow-900/30 border-b border-purple-200 dark:border-purple-700">
        <div className="flex items-center gap-2 mb-1">
          <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            📊 Najpopularniejsze Stanowiska
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Stanowiska najczęściej dodawane do alertów
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {MOCK_TOP_POSITIONS.map((item) => (
            <div
              key={item.rank}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors border border-transparent hover:border-purple-200 dark:hover:border-purple-700"
            >
              <div className="flex items-center gap-3 flex-1">
                <Badge className={getRankBadgeColor(item.rank)}>
                  #{item.rank}
                </Badge>
                {item.rank <= 3 && (
                  <span className="text-2xl" title={`Rank ${item.rank}`}>
                    {getMedalEmoji(item.rank)}
                  </span>
                )}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {item.position}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  {item.alerts} alertów
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
