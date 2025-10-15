import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, TrendingUp } from 'lucide-react';

interface AlertInsightsProps {
  data: {
    most_tracked_companies: Array<{
      company: string;
      subscribers: number;
    }>;
    most_tracked_positions: Array<{
      position: string;
      alerts_count: number;
    }>;
    total_alerts: number;
    active_alerts: number;
  };
}

export default function AlertInsights({ data }: AlertInsightsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Most Tracked Companies */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Najczęściej Śledzone Firmy</CardTitle>
              <CardDescription>
                Firmy z największą liczbą alertów użytkowników
              </CardDescription>
            </div>
            <Bell className="w-5 h-5 text-yellow-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.most_tracked_companies?.length > 0 ? (
              data.most_tracked_companies.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">
                        #{index + 1}
                      </span>
                    </div>
                    <span className="font-medium">{item.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {item.subscribers} subskrybentów
                    </span>
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Brak danych o śledzonych firmach</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Most Tracked Positions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Najpopularniejsze Stanowiska</CardTitle>
              <CardDescription>
                Stanowiska najczęściej dodawane do alertów
              </CardDescription>
            </div>
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.most_tracked_positions?.length > 0 ? (
              data.most_tracked_positions.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">
                        #{index + 1}
                      </span>
                    </div>
                    <span className="font-medium">{item.position}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {item.alerts_count} alertów
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Brak danych o stanowiskach</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Podsumowanie Alertów</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {data.total_alerts || 0}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Wszystkie alerty
              </div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {data.active_alerts || 0}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Aktywne alerty
              </div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {data.most_tracked_companies?.length || 0}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Śledzone firmy
              </div>
            </div>

            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600">
                {data.most_tracked_positions?.length || 0}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Śledzone stanowiska
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
