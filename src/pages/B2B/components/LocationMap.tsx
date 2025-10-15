import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface LocationMapProps {
  data: Array<{
    city: string;
    job_count: number;
    companies: string[];
    growth: number;
  }>;
}

export default function LocationMap({ data }: LocationMapProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Rozkład Geograficzny</CardTitle>
            <CardDescription>
              Lokalizacje rekrutacji konkurencji
            </CardDescription>
          </div>
          <MapPin className="w-5 h-5 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.length > 0 ? (
            data.map((location, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-lg">{location.city}</h3>
                  </div>
                  <span className="text-xs text-green-600 font-medium">
                    +{location.growth}%
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Liczba ofert</span>
                    <span className="font-semibold">{location.job_count}</span>
                  </div>

                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Firmy: </span>
                    {location.companies.join(', ')}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-gray-500">
              <p>Brak danych o lokalizacjach</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
