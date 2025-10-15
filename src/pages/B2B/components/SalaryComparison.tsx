import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

interface SalaryComparisonProps {
  data: Array<{
    company: string;
    min_salary: number;
    max_salary: number;
    avg_salary: number;
    median_salary: number;
  }>;
}

export default function SalaryComparison({ data }: SalaryComparisonProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Porównanie Wynagrodzeń</CardTitle>
            <CardDescription>
              Widełki płacowe według firm
            </CardDescription>
          </div>
          <DollarSign className="w-5 h-5 text-green-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{item.company}</span>
                  <span className="text-sm text-gray-500">
                    {item.min_salary.toLocaleString()} - {item.max_salary.toLocaleString()} PLN
                  </span>
                </div>

                {/* Salary Range Bar */}
                <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="absolute h-full bg-gradient-to-r from-green-400 to-green-600 rounded-lg"
                    style={{
                      left: `${(item.min_salary / item.max_salary) * 100}%`,
                      width: `${((item.max_salary - item.min_salary) / item.max_salary) * 100}%`
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-700">
                      Średnia: {item.avg_salary.toLocaleString()} PLN
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>Min: {item.min_salary.toLocaleString()}</span>
                  <span>Mediana: {item.median_salary.toLocaleString()}</span>
                  <span>Max: {item.max_salary.toLocaleString()}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Brak danych o wynagrodzeniach</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
