import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart } from 'lucide-react';

interface CategoryBreakdownProps {
  data: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
}

export default function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Rozkład Kategorii Stanowisk</CardTitle>
            <CardDescription>
              Najpopularniejsze kategorie w ogłoszeniach
            </CardDescription>
          </div>
          <PieChart className="w-5 h-5 text-purple-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-4 h-4 rounded"
                    style={{
                      backgroundColor: `hsl(${(index * 360) / data.length}, 70%, 50%)`
                    }}
                  />
                  <span className="text-sm font-medium">{item.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{item.count} ofert</span>
                  <span className="text-sm font-semibold text-purple-600">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Brak danych do wyświetlenia</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
