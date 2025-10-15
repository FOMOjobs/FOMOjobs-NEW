import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, Flame } from 'lucide-react';

interface TrendingRolesProps {
  data: Array<{
    role: string;
    count: number;
    growth: number;
    avg_salary: number;
    companies: string[];
  }>;
}

export default function TrendingRoles({ data }: TrendingRolesProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Trending Roles
            </CardTitle>
            <CardDescription>
              Najpopularniejsze stanowiska w ostatnim okresie
            </CardDescription>
          </div>
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.length > 0 ? (
            data.map((role, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all hover:border-purple-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-sm">{role.role}</h3>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      role.growth > 50
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    +{role.growth}%
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Liczba ofert</span>
                    <span className="font-semibold">{role.count}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Średnia płaca</span>
                    <span className="font-semibold text-green-600">
                      {role.avg_salary.toLocaleString()} PLN
                    </span>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Firmy: </span>
                      {role.companies.slice(0, 3).join(', ')}
                      {role.companies.length > 3 && ` +${role.companies.length - 3} więcej`}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-gray-500">
              <p>Brak danych o trendujących stanowiskach</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
