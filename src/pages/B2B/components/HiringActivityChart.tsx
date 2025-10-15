import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface HiringActivityChartProps {
  data: Array<{
    date: string;
    company: string;
    jobs_posted: number;
  }>;
}

export default function HiringActivityChart({ data }: HiringActivityChartProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Aktywność Rekrutacyjna</CardTitle>
            <CardDescription>
              Liczba opublikowanych ogłoszeń w czasie
            </CardDescription>
          </div>
          <TrendingUp className="w-5 h-5 text-purple-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96 flex items-center justify-center text-gray-500">
          {/* TODO: Integrate Chart.js or Recharts */}
          <div className="text-center">
            <p className="mb-2">📊 Wykres aktywności rekrutacyjnej</p>
            <p className="text-sm">
              {data.length} punktów danych do wyświetlenia
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
