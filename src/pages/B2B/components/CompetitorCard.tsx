import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Briefcase, TrendingUp, Users } from 'lucide-react';

interface CompetitorCardProps {
  competitor: {
    id: number;
    name: string;
    total_jobs: number;
    active_jobs: number;
    hiring_velocity: number;
    alert_subscribers: number;
    avg_salary: number;
    logo_url?: string;
  };
}

export default function CompetitorCard({ competitor }: CompetitorCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3">
          {competitor.logo_url ? (
            <img
              src={competitor.logo_url}
              alt={competitor.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
          )}
          <CardTitle className="text-lg">{competitor.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4" />
            <span>Aktywne ogłoszenia</span>
          </div>
          <span className="font-semibold">{competitor.active_jobs}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>Tempo rekrutacji</span>
          </div>
          <span className="font-semibold">{competitor.hiring_velocity}/mies</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>Alerty użytkowników</span>
          </div>
          <span className="font-semibold">{competitor.alert_subscribers}</span>
        </div>
      </CardContent>
    </Card>
  );
}
